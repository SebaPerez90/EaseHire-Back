import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { User } from 'src/database/entities/user.entity';
import { NotificationType } from 'src/enum/notification.enum';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  //example
  @Get()
  async getAllNotifications() {
    return 'get all';
  }
  @Get(':id')
  async getNotificationById() {
    return 'get by id';
  }

  @Post()
  async createNotification(
    @Body() notificationData: NotificationType,
    user: User,
  ) {
    return this.notificationsService.postNotification(notificationData, user);
  }

  @Patch(':id')
  async updateNotification() {
    return 'update';
  }
  @Delete(':id')
  async deleteNotification() {
    return 'delete';
  }
}
