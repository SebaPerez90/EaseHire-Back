import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  //example
  @Get()
  async getAllNotifications() {
    return await this.notificationsService.getAllNotifications();
  }
}
