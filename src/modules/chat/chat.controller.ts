import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';
import { MarkReadDto } from './dtos/mark-read.dto';
import { ConversationQueryDto } from './dtos/conversation-query.dto';
import { MessageQueryDto } from './dtos/message-query.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // ─── Conversations ───────────────────────────────────────────────────

  @Post('/conversations')
  @ApiOperation({
    summary:
      'Create or retrieve a conversation for a job (customer↔provider who bid or was booked)',
  })
  async getOrCreateConversation(
    @GetUser('sub') userId: string,
    @Body() dto: CreateConversationDto,
  ) {
    return this.chatService.getOrCreateConversation(userId, dto);
  }

  @Get('/conversations')
  @ApiOperation({ summary: 'List my conversations with unread counts' })
  async listConversations(
    @GetUser('sub') userId: string,
    @Query() query: ConversationQueryDto,
  ) {
    return this.chatService.listConversations(userId, query);
  }

  @Delete('/conversations/:id')
  @ApiOperation({
    summary:
      'Remove conversation from my list (soft delete — history retained for disputes)',
  })
  async deleteConversation(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.chatService.deleteConversation(userId, id);
  }

  @Post('/conversations/:id/read')
  @ApiOperation({ summary: 'Mark messages as read (read receipt)' })
  async markAsRead(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: MarkReadDto,
  ) {
    return this.chatService.markAsRead(userId, id, dto);
  }

  @Post('/conversations/:id/typing')
  @ApiOperation({ summary: 'Broadcast typing indicator to the other party' })
  async typingIndicator(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body('isTyping') isTyping: boolean,
  ) {
    return this.chatService.sendTypingIndicator(userId, id, !!isTyping);
  }

  // ─── Messages ────────────────────────────────────────────────────────

  @Get('/conversations/:id/messages')
  @ApiOperation({
    summary: 'Fetch conversation history (chronological, paginated)',
  })
  async getHistory(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: MessageQueryDto,
  ) {
    return this.chatService.getConversationHistory(userId, id, query);
  }

  @Post('/conversations/:id/messages')
  @ApiOperation({
    summary: 'Send a message (TEXT, IMAGE with attachmentUrl, or LOCATION)',
  })
  async sendMessage(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(userId, id, dto);
  }

  @Post('/conversations/:id/messages/image')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        caption: { type: 'string' },
      },
    },
  })
  @ApiOperation({ summary: 'Upload and send an image message' })
  async sendImageMessage(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('caption') caption?: string,
  ) {
    return this.chatService.sendImageMessage(userId, id, file, caption);
  }

  @Patch('/messages/:id')
  @ApiOperation({
    summary: 'Edit your own message (within edit window)',
  })
  async editMessage(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMessageDto,
  ) {
    return this.chatService.editMessage(userId, id, dto);
  }

  @Delete('/messages/:id')
  @ApiOperation({
    summary: 'Soft delete your own message (within edit window)',
  })
  async deleteMessage(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.chatService.deleteMessage(userId, id);
  }
}
