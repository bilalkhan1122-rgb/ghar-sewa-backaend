import { Controller, Get, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UpdateNotificationPreferencesDto } from './dtos/update-notification-preferences.dto';

@ApiTags('Notifications (Preferences)')
@Controller('notifications/preferences')
export class PreferencesController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get my notification preferences' })
  async getPreferences(@GetUser('sub') userId: string) {
    return this.notificationsService.getPreferences(userId);
  }

  @Patch('/')
  @ApiOperation({ summary: 'Update my notification preferences' })
  async updatePreferences(
    @GetUser('sub') userId: string,
    @Body() dto: UpdateNotificationPreferencesDto,
  ) {
    return this.notificationsService.updatePreferences(userId, dto);
  }
}
