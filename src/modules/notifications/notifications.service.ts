import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/database/entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationType } from 'src/enum/notification.enum';
import { User } from 'src/database/entities/user.entity';
import * as moment from 'moment';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  //example
  async getAllNotifications() {
    return await this.notificationsRepository.find();
  }

  async postNotification(notificationData: NotificationType, user: User) {
    const notification = new Notification();
    const date = new Date();
    const timelapsed = moment(date).fromNow();

    notification.type = notificationData;

    if (notification.type === NotificationType.OFFER_JOB)
      notification.title = 'New Job Offer!';
    if (notification.type === NotificationType.FEEDBACK)
      notification.title = 'New Feedback!';

    notification.date = date;
    notification.timelapse = timelapsed;
    notification.user = user;
    await this.notificationsRepository.save(notification);
    return notification;
  }
}
