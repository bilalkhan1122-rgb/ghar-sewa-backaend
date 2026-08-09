import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { NotificationQueryDto } from './dtos/notification-query.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/')
  @ApiOperation({ summary: 'List my notifications (newest first, paginated)' })
  async list(
    @GetUser('sub') userId: string,
    @Query() query: NotificationQueryDto,
  ) {
    return this.notificationsService.list(userId, query);
  }

  @Get('/unread-count')
  @ApiOperation({ summary: 'Get unread notification count' })
  async unreadCount(@GetUser('sub') userId: string) {
    return this.notificationsService.unreadCount(userId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'View a single notification' })
  async getById(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificationsService.getById(userId, id);
  }

  @Post('/:id/read')
  @ApiOperation({ summary: 'Mark a single notification as read' })
  async markAsRead(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificationsService.markAsRead(userId, id);
  }

  @Post('/read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllAsRead(@GetUser('sub') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a notification (soft delete)' })
  async remove(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificationsService.remove(userId, id);
  }
}
