import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
  forwardRef,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileUploadService } from "src/common/services/file-upload.service";
import { ChatGateway } from "./chat.gateway";
import { NotificationsService } from "src/modules/notifications/notifications.service";
import {
  RealtimeService,
  PUSHER_EVENTS,
} from "src/modules/realtime/realtime.service";
import { PUSHER_CHANNELS } from "src/modules/realtime/realtime-channels";
import { CreateConversationDto } from "./dtos/create-conversation.dto";
import { SendMessageDto, ChatMessageType } from "./dtos/send-message.dto";
import { UpdateMessageDto } from "./dtos/update-message.dto";
import { MarkReadDto } from "./dtos/mark-read.dto";
import {
  ConversationQueryDto,
  ConversationSortField,
} from "./dtos/conversation-query.dto";
import { MessageQueryDto } from "./dtos/message-query.dto";
import { Logger } from "nestjs-pino";
import {
  Prisma,
  UserRole,
  MessageType,
  BookingStatus,
  NotificationType,
} from "generated/prisma/client";
import { hasRole } from "src/common/roles";

/**
 * Configurable edit window (minutes). Senders may only edit/delete
 * their own messages within this window after sending.
 */
export const MESSAGE_EDIT_WINDOW_MINUTES = 5;

/**
 * Longest message preview carried in a push. A notification banner shows two
 * lines at most, and the rest is dropped by the OS anyway.
 */
const PUSH_PREVIEW_LIMIT = 120;

function truncate(text: string, limit: number): string {
  return text.length <= limit ? text : `${text.slice(0, limit - 1).trimEnd()}…`;
}

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
    @Inject(forwardRef(() => ChatGateway))
    private readonly gateway: ChatGateway,
    private readonly logger: Logger,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeService,
  ) {}

  // ─── Create / Retrieve Conversation ──────────────────────────────────

  async getOrCreateConversation(userId: string, dto: CreateConversationDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
      select: { id: true, customerId: true, status: true },
    });

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    if (dto.participantId === userId) {
      throw new BadRequestException("You cannot start a chat with yourself");
    }

    // Resolve who is customer and who is provider for this job
    let customerId: string;
    let providerId: string;

    if (job.customerId === userId) {
      customerId = userId;
      providerId = dto.participantId;
    } else if (job.customerId === dto.participantId) {
      providerId = userId;
      customerId = dto.participantId;
    } else {
      throw new ForbiddenException(
        "You are not part of this job and cannot start this conversation",
      );
    }

    // Provider must actually be involved in the job
    const providerUser = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: { id: true, role: true, roles: true },
    });

    if (!providerUser || !hasRole(providerUser, UserRole.PROVIDER)) {
      throw new BadRequestException(
        "Conversations can only be started with a provider involved in the job",
      );
    }

    // Chat rules:
    //  - Customers may chat only with providers who submitted a bid OR were directly booked
    //  - Providers may chat only with the customer for jobs they are involved in
    const [bid, booking] = await Promise.all([
      this.prisma.bid.findFirst({
        where: { jobId: job.id, providerId },
        select: { id: true, status: true },
      }),
      this.prisma.booking.findFirst({
        where: { jobId: job.id, providerId },
        select: { id: true, status: true },
      }),
    ]);

    if (!bid && !booking) {
      throw new ForbiddenException(
        "You can only chat with a provider who submitted a bid or was booked for this job",
      );
    }

    // One thread per pair of people. The job above is still what authorises the
    // chat — it is just not part of the conversation's identity, so talking
    // about a second job continues the existing thread instead of starting an
    // empty one and stranding the history.
    const existing = await this.prisma.conversation.findUnique({
      where: {
        customerId_providerId: { customerId, providerId },
      },
      include: this.conversationIncludes(),
    });

    if (existing) {
      return existing;
    }

    // bookingId is optional until accepted — use active (non-cancelled) booking
    const activeBooking =
      booking && booking.status !== BookingStatus.CANCELLED ? booking : null;

    const conversation = await this.prisma.conversation.create({
      data: {
        jobId: job.id,
        bookingId: activeBooking?.id ?? dto.bookingId ?? null,
        customerId,
        providerId,
        lastActivity: new Date(),
      },
      include: this.conversationIncludes(),
    });

    this.logger.log({
      message: "Conversation created",
      conversationId: conversation.id,
      jobId: job.id,
      customerId,
      providerId,
    });

    return conversation;
  }

  // ─── Send Message ────────────────────────────────────────────────────

  async sendMessage(
    userId: string,
    conversationId: string,
    dto: SendMessageDto,
  ) {
    const conversation = await this.getConversationForUser(
      conversationId,
      userId,
    );

    this.validateMessagePayload(dto);

    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        type: dto.type,
        content: dto.content,
        attachmentUrl: dto.attachmentUrl,
        latitude: dto.latitude,
        longitude: dto.longitude,
        deliveredAt: new Date(), // delivered to the server
      },
      include: this.messageIncludes(),
    });

    // Touch conversation metadata
    const lastMessage = this.messagePreview(message);
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessage,
        lastMessageAt: new Date(),
        lastActivity: new Date(),
      },
    });

    // Real-time broadcast (also delivered to the other party's personal room)
    this.gateway.emitNewMessage(conversationId, message, conversation, userId);
    await this.notifyNewMessage(conversation, userId, lastMessage, message);

    this.logger.log({
      message: "Message sent",
      conversationId,
      senderId: userId,
      type: dto.type,
    });

    return message;
  }

  // ─── Send Image Message (file upload) ────────────────────────────────

  /**
   * A recorded voice note.
   *
   * `durationMs` comes from the recorder rather than being derived server-side:
   * decoding audio to measure it would mean pulling ffmpeg into a serverless
   * function for a number the client already has.
   */
  async sendVoiceMessage(
    userId: string,
    conversationId: string,
    file: Express.Multer.File,
    durationMs?: number,
  ) {
    const conversation = await this.getConversationForUser(
      conversationId,
      userId,
    );

    const attachmentUrl = await this.fileUpload.uploadVoiceNote(file);

    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        type: MessageType.VOICE,
        attachmentUrl,
        durationMs:
          durationMs && durationMs > 0 ? Math.round(durationMs) : null,
        deliveredAt: new Date(),
      },
      include: this.messageIncludes(),
    });

    const lastMessage = this.messagePreview(message);
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessage,
        lastMessageAt: new Date(),
        lastActivity: new Date(),
      },
    });

    this.gateway.emitNewMessage(conversationId, message, conversation, userId);
    await this.notifyNewMessage(conversation, userId, lastMessage, message);

    return message;
  }

  async sendImageMessage(
    userId: string,
    conversationId: string,
    file: Express.Multer.File,
    caption?: string,
  ) {
    const conversation = await this.getConversationForUser(
      conversationId,
      userId,
    );

    const attachmentUrl = await this.fileUpload.uploadChatImage(file);

    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        type: MessageType.IMAGE,
        content: caption,
        attachmentUrl,
        deliveredAt: new Date(),
      },
      include: this.messageIncludes(),
    });

    const lastMessage = this.messagePreview(message);
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessage,
        lastMessageAt: new Date(),
        lastActivity: new Date(),
      },
    });

    this.gateway.emitNewMessage(conversationId, message, conversation, userId);
    await this.notifyNewMessage(conversation, userId, lastMessage, message);

    return message;
  }

  // ─── Edit Own Message ────────────────────────────────────────────────

  async editMessage(userId: string, messageId: string, dto: UpdateMessageDto) {
    const message = await this.getOwnMessage(userId, messageId);

    // Configurable edit window
    const editDeadline = new Date(
      message.createdAt.getTime() + MESSAGE_EDIT_WINDOW_MINUTES * 60 * 1000,
    );
    if (new Date() > editDeadline) {
      throw new ForbiddenException(
        `Messages can only be edited within ${MESSAGE_EDIT_WINDOW_MINUTES} minutes of sending`,
      );
    }

    const updated = await this.prisma.message.update({
      where: { id: messageId },
      data: {
        ...(dto.content !== undefined && { content: dto.content }),
        ...(dto.attachmentUrl !== undefined && {
          attachmentUrl: dto.attachmentUrl,
        }),
        editedAt: new Date(),
      },
      include: this.messageIncludes(),
    });

    // Refresh conversation preview
    await this.prisma.conversation.update({
      where: { id: message.conversationId },
      data: { lastMessage: this.messagePreview(updated) },
    });

    const conversation = await this.getConversationForUser(
      message.conversationId,
      userId,
    );

    this.gateway.emitMessageEdited(
      message.conversationId,
      updated,
      conversation,
      userId,
    );

    return updated;
  }

  // ─── Delete Own Message (soft delete) ────────────────────────────────

  async deleteMessage(userId: string, messageId: string) {
    const message = await this.getOwnMessage(userId, messageId);

    // Configurable edit window
    const editDeadline = new Date(
      message.createdAt.getTime() + MESSAGE_EDIT_WINDOW_MINUTES * 60 * 1000,
    );
    if (new Date() > editDeadline) {
      throw new ForbiddenException(
        `Messages can only be deleted within ${MESSAGE_EDIT_WINDOW_MINUTES} minutes of sending`,
      );
    }

    const deleted = await this.prisma.message.update({
      where: { id: messageId },
      data: { deletedAt: new Date() },
      include: this.messageIncludes(),
    });

    // Refresh conversation preview
    const latest = await this.prisma.message.findFirst({
      where: {
        conversationId: message.conversationId,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });

    await this.prisma.conversation.update({
      where: { id: message.conversationId },
      data: {
        lastMessage: latest ? this.messagePreview(latest) : null,
        lastMessageAt: latest?.createdAt ?? null,
      },
    });

    const conversation = await this.getConversationForUser(
      message.conversationId,
      userId,
    );

    this.gateway.emitMessageDeleted(
      message.conversationId,
      deleted,
      conversation,
      userId,
    );

    return { message: "Message deleted successfully", id: messageId };
  }

  // ─── Conversation History ────────────────────────────────────────────

  async getConversationHistory(
    userId: string,
    conversationId: string,
    query: MessageQueryDto,
  ) {
    const { page = 1, limit = 20, before } = query;
    const skip = (page - 1) * limit;

    await this.getConversationForUser(conversationId, userId);

    const where: Prisma.MessageWhereInput = {
      conversationId,
      deletedAt: null,
      ...(before ? { createdAt: { lt: new Date(before) } } : {}),
    };

    const [messages, total] = await Promise.all([
      this.prisma.message.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }, // fetch newest first for pagination
        include: this.messageIncludes(),
      }),
      this.prisma.message.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: messages.reverse(), // return in chronological order
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  // ─── Mark Messages as Read ───────────────────────────────────────────

  async markAsRead(userId: string, conversationId: string, dto: MarkReadDto) {
    const conversation = await this.getConversationForUser(
      conversationId,
      userId,
    );

    const readAt = new Date();

    if (dto.messageIds && dto.messageIds.length > 0) {
      await this.prisma.message.updateMany({
        where: {
          id: { in: dto.messageIds },
          conversationId,
          senderId: { not: userId },
          readAt: null,
          deletedAt: null,
        },
        data: { readAt },
      });
    } else {
      // Mark all messages from the other party as read
      await this.prisma.message.updateMany({
        where: {
          conversationId,
          senderId: { not: userId },
          readAt: null,
          deletedAt: null,
        },
        data: { readAt },
      });
    }

    const unreadCount = await this.unreadCount(conversationId, userId);

    // Read receipts drive the "seen" ticks, so they need the same Pusher
    // delivery as the messages themselves — the gateway below is local-only.
    const otherPartyId =
      conversation.customerId === userId
        ? conversation.providerId
        : conversation.customerId;
    await this.realtime.publish(
      PUSHER_CHANNELS.user(otherPartyId),
      PUSHER_EVENTS.CHAT_MESSAGE_READ,
      { conversationId, userId, readAt: readAt.toISOString() },
    );

    // Real-time read receipt
    this.gateway.emitReadReceipt(
      conversationId,
      userId,
      readAt,
      unreadCount,
      conversation,
    );

    return { conversationId, readAt, unreadCount };
  }

  // ─── List Conversations ──────────────────────────────────────────────

  async listConversations(userId: string, query: ConversationQueryDto) {
    const {
      page = 1,
      limit = 10,
      jobId,
      sortBy = ConversationSortField.LAST_ACTIVITY,
      sortOrder = "desc",
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ConversationWhereInput = {
      OR: [
        { customerId: userId, customerDeletedAt: null },
        { providerId: userId, providerDeletedAt: null },
      ],
      ...(jobId ? { jobId } : {}),
    };

    const orderByField =
      sortBy === ConversationSortField.CREATED_AT
        ? "createdAt"
        : "lastActivity";

    const [conversations, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: sortOrder },
        include: {
          ...this.conversationIncludes(),
          // Who sent the last message, and what kind it was. The stored
          // `lastMessage` is a rendered string and cannot answer either: an
          // inbox has no way to prefix your own messages with "You:", and the
          // media previews arrive as emoji baked into the text rather than as
          // something the client can draw an icon for.
          //
          // Read off the newest message rather than denormalised onto the
          // conversation, so no column — and so no migration — is added for
          // two fields the row next to them already implies.
          messages: {
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { senderId: true, type: true },
          },
        },
      }),
      this.prisma.conversation.count({ where }),
    ]);

    // Attach unread counts
    const withUnread = await Promise.all(
      conversations.map(async ({ messages, ...c }) => ({
        ...c,
        // Flattened out of the include: `messages` is the query's way of
        // reaching the last one, not a field the inbox has any use for.
        lastMessageSenderId: messages[0]?.senderId ?? null,
        lastMessageType: messages[0]?.type ?? null,
        unreadCount: await this.unreadCount(c.id, userId),
      })),
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: withUnread,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  // ─── Soft Delete Conversation (retention: never hard-deleted) ────────

  async deleteConversation(userId: string, conversationId: string) {
    const conversation = await this.getConversationForUser(
      conversationId,
      userId,
    );

    const isCustomer = conversation.customerId === userId;
    const now = new Date();

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: isCustomer
        ? { customerDeletedAt: now }
        : { providerDeletedAt: now },
    });

    return {
      message:
        "Conversation removed from your list. Chat history is retained for dispute resolution.",
    };
  }

  // ─── Typing Indicator (via REST convenience) ─────────────────────────

  async sendTypingIndicator(
    userId: string,
    conversationId: string,
    isTyping: boolean,
  ) {
    const conversation = await this.getConversationForUser(
      conversationId,
      userId,
    );
    this.gateway.emitTyping(conversationId, userId, isTyping, conversation);
    return { conversationId, isTyping };
  }

  // ─── Helpers ─────────────────────────────────────────────────────────

  private validateMessagePayload(dto: SendMessageDto) {
    switch (dto.type) {
      case ChatMessageType.TEXT:
        if (!dto.content || !dto.content.trim()) {
          throw new BadRequestException(
            "Content is required for text messages",
          );
        }
        break;
      case ChatMessageType.IMAGE:
        if (!dto.attachmentUrl) {
          throw new BadRequestException(
            "Attachment URL is required for image messages",
          );
        }
        break;
      case ChatMessageType.LOCATION:
        if (dto.latitude == null || dto.longitude == null) {
          throw new BadRequestException(
            "Latitude and longitude are required for location messages",
          );
        }
        break;
    }
  }

  async getConversationForUser(conversationId: string, userId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    const isCustomer = conversation.customerId === userId;
    const isProvider = conversation.providerId === userId;

    if (!isCustomer && !isProvider) {
      throw new ForbiddenException("You are not part of this conversation");
    }

    // Respect per-side soft deletion
    if (isCustomer && conversation.customerDeletedAt) {
      throw new NotFoundException("Conversation not found");
    }
    if (isProvider && conversation.providerDeletedAt) {
      throw new NotFoundException("Conversation not found");
    }

    return conversation;
  }

  private async getOwnMessage(userId: string, messageId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message || message.deletedAt) {
      throw new NotFoundException("Message not found");
    }

    if (message.senderId !== userId) {
      throw new ForbiddenException("You can only manage your own messages");
    }

    return message;
  }

  private async unreadCount(conversationId: string, userId: string) {
    return this.prisma.message.count({
      where: {
        conversationId,
        senderId: { not: userId },
        readAt: null,
        deletedAt: null,
      },
    });
  }

  /**
   * Notifies the other participant about a new message.
   *
   * Fire-and-forget so a notification failure can never fail the send, and
   * skipped for the sender. The NEW_MESSAGE type maps to the CHAT category,
   * which respects the user's existing chatEnabled preference.
   */
  private async notifyNewMessage(
    conversation: { id: string; customerId: string; providerId: string },
    senderId: string,
    preview: string,
    message?: { sender?: { fullName?: string | null } } | null,
  ) {
    const recipientId =
      conversation.customerId === senderId
        ? conversation.providerId
        : conversation.customerId;

    // Who it is from is the useful part of a message notification. Every chat
    // push used to read "New message" with the text underneath, so a phone
    // showing several of them said nothing about who was waiting on a reply.
    const senderName = message?.sender?.fullName?.trim();
    const title = senderName || "New message";
    const body = truncate(preview || "Sent you a message", PUSH_PREVIEW_LIMIT);

    // Awaited, not fire-and-forget: on Vercel the function is frozen as soon
    // as the response is sent, so a promise left running here is simply never
    // completed and the message is never delivered. Failures are swallowed —
    // the message is already committed and must not fail on a delivery error.
    try {
      await Promise.all([
        this.notifications.send({
          userId: recipientId,
          type: NotificationType.NEW_MESSAGE,
          title,
          message: body,
          relatedEntityType: "CONVERSATION",
          relatedEntityId: conversation.id,
        }),
        // Live delivery to the open thread. Pusher rather than the Socket.IO
        // gateway because the deployment is serverless: a function cannot hold
        // a WebSocket open, so the gateway never runs in production.
        message
          ? this.realtime.publish(
              PUSHER_CHANNELS.user(recipientId),
              PUSHER_EVENTS.CHAT_MESSAGE_NEW,
              { conversationId: conversation.id, message },
            )
          : Promise.resolve(),
      ]);
    } catch (error) {
      this.logger.warn({
        message: "Message delivery notification failed",
        conversationId: conversation.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  private messagePreview(message: {
    type: string;
    content?: string | null;
    attachmentUrl?: string | null;
  }): string {
    if (message.content) return message.content;
    switch (message.type) {
      case MessageType.IMAGE:
        return "📷 Image";
      case MessageType.LOCATION:
        return "📍 Location";
      case MessageType.VOICE:
        return "🎤 Voice message";
      default:
        return "";
    }
  }

  private messageIncludes() {
    return {
      sender: {
        select: { id: true, fullName: true, profilePhoto: true, role: true },
      },
    };
  }

  private conversationIncludes() {
    return {
      job: {
        select: {
          id: true,
          title: true,
          status: true,
          category: { select: { id: true, name: true, icon: true } },
        },
      },
      customer: {
        select: { id: true, fullName: true, profilePhoto: true },
      },
      provider: {
        select: { id: true, fullName: true, profilePhoto: true },
      },
    };
  }
}
