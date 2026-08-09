import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatService } from './chat.service';
import { Logger } from 'nestjs-pino';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  role?: string;
}

interface JwtPayload {
  sub: string;
  role: string;
  email?: string;
}

/**
 * Socket.IO gateway broadcasting real-time chat events:
 * message:new, message:edited, message:deleted, read:receipt, typing.
 *
 * Clients authenticate with their JWT access token via
 * `auth.token`, an `accessToken` cookie, or `?token=` query param.
 */
@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
  namespace: '/chat',
})
@Injectable()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
    private readonly logger: Logger,
  ) {}

  afterInit() {
    this.logger.log('Chat gateway initialized', 'ChatGateway');
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token = this.extractToken(client);
      if (!token) {
        client.disconnect(true);
        return;
      }

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      });

      client.userId = payload.sub;
      client.role = payload.role;

      // Join a personal room for direct notifications
      await client.join(`user:${client.userId}`);
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(
      { userId: client.userId, socketId: client.id },
      'Chat client disconnected',
    );
  }

  // ─── Join Conversation Room ──────────────────────────────────────────

  @SubscribeMessage('conversation:join')
  async handleJoinConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    if (!client.userId || !data?.conversationId) return;

    // Verify membership before joining the room
    try {
      await this.chatService.getConversationForUser(
        data.conversationId,
        client.userId,
      );
      await client.join(`conversation:${data.conversationId}`);
      client.emit('conversation:joined', {
        conversationId: data.conversationId,
      });
    } catch {
      client.emit('conversation:error', {
        conversationId: data.conversationId,
        message: 'You are not part of this conversation',
      });
    }
  }

  @SubscribeMessage('conversation:leave')
  async handleLeaveConversation(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string },
  ) {
    if (!data?.conversationId) return;
    await client.leave(`conversation:${data.conversationId}`);
  }

  // ─── Typing Indicator ────────────────────────────────────────────────

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { conversationId: string; isTyping: boolean },
  ) {
    if (!client.userId || !data?.conversationId) return;

    // Verify membership
    try {
      await this.chatService.getConversationForUser(
        data.conversationId,
        client.userId,
      );
      this.emitTyping(data.conversationId, client.userId, !!data.isTyping);
    } catch {
      // ignore invalid membership
    }
  }

  // ─── Broadcast Helpers (called by ChatService) ───────────────────────

  private otherPartyId(
    conversation: { customerId: string; providerId: string },
    senderId: string,
  ): string {
    return conversation.customerId === senderId
      ? conversation.providerId
      : conversation.customerId;
  }

  emitNewMessage(
    conversationId: string,
    message: unknown,
    conversation?: { customerId: string; providerId: string },
    senderId?: string,
  ) {
    const payload = { conversationId, message };
    this.server
      .to(`conversation:${conversationId}`)
      .emit('message:new', payload);
    // Fallback: deliver to the other party's personal room even if they
    // haven't joined the conversation room yet.
    if (conversation && senderId) {
      this.server
        .to(`user:${this.otherPartyId(conversation, senderId)}`)
        .emit('message:new', payload);
    }
  }

  emitMessageEdited(
    conversationId: string,
    message: unknown,
    conversation?: { customerId: string; providerId: string },
    senderId?: string,
  ) {
    const payload = { conversationId, message };
    this.server
      .to(`conversation:${conversationId}`)
      .emit('message:edited', payload);
    if (conversation && senderId) {
      this.server
        .to(`user:${this.otherPartyId(conversation, senderId)}`)
        .emit('message:edited', payload);
    }
  }

  emitMessageDeleted(
    conversationId: string,
    message: unknown,
    conversation?: { customerId: string; providerId: string },
    senderId?: string,
  ) {
    const payload = { conversationId, message };
    this.server
      .to(`conversation:${conversationId}`)
      .emit('message:deleted', payload);
    if (conversation && senderId) {
      this.server
        .to(`user:${this.otherPartyId(conversation, senderId)}`)
        .emit('message:deleted', payload);
    }
  }

  emitReadReceipt(
    conversationId: string,
    userId: string,
    readAt: Date,
    unreadCount: number,
    conversation?: { customerId: string; providerId: string },
  ) {
    const payload = { conversationId, userId, readAt, unreadCount };
    this.server
      .to(`conversation:${conversationId}`)
      .emit('read:receipt', payload);
    if (conversation) {
      this.server
        .to(`user:${this.otherPartyId(conversation, userId)}`)
        .emit('read:receipt', payload);
    }
  }

  emitTyping(
    conversationId: string,
    userId: string,
    isTyping: boolean,
    conversation?: { customerId: string; providerId: string },
  ) {
    this.server.to(`conversation:${conversationId}`).emit('typing', {
      conversationId,
      userId,
      isTyping,
    });
    if (conversation) {
      this.server
        .to(`user:${this.otherPartyId(conversation, userId)}`)
        .emit('typing', { conversationId, userId, isTyping });
    }
  }

  // ─── Helpers ─────────────────────────────────────────────────────────

  private extractToken(client: Socket): string | null {
    const handshake = client.handshake;

    // 1. auth.token
    const authToken = (handshake.auth as Record<string, unknown>)?.token;
    if (typeof authToken === 'string' && authToken) return authToken;

    // 2. query ?token=
    const queryToken = handshake.query?.token;
    if (typeof queryToken === 'string' && queryToken) return queryToken;

    // 3. accessToken cookie
    const cookieHeader = handshake.headers?.cookie;
    if (cookieHeader) {
      const match = cookieHeader.match(/(?:^|;\s*)accessToken=([^;]+)/);
      if (match) return decodeURIComponent(match[1]);
    }

    return null;
  }
}
