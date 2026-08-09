import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { RegisterDeviceDto } from './dtos/register-device.dto';

@ApiTags('Notifications (Devices)')
@Controller('notifications/devices')
export class DevicesController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('/')
  @ApiOperation({ summary: 'Register a device for push notifications' })
  async register(
    @GetUser('sub') userId: string,
    @Body() dto: RegisterDeviceDto,
  ) {
    return this.notificationsService.registerDevice(userId, dto);
  }

  @Get('/')
  @ApiOperation({ summary: 'List my registered devices' })
  async listDevices(@GetUser('sub') userId: string) {
    return this.notificationsService.listDevices(userId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Unregister a device' })
  async unregister(
    @GetUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificationsService.unregisterDevice(userId, id);
  }
}
