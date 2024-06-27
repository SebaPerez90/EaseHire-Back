import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from 'src/database/entities/invitation.entity';
import { User } from 'src/database/entities/user.entity';
import { Credential } from 'src/database/entities/credentials.entity';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { ExperienceService } from '../experience/experience.service';
import { Experience } from 'src/database/entities/experience.entity';
import { FeedbackService } from '../feedback/feedback.service';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Profesion } from 'src/database/entities/profession.entity';
import { Notification } from 'src/database/entities/notification.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invitation,
      User,
      Credential,
      Experience,
      Feedback,
      Profesion,
      Notification,
    ]),
  ],
  controllers: [InvitationController],
  providers: [
    InvitationService,
    AuthService,
    UsersService,
    ExperienceService,
    FeedbackService,
    NotificationsService,
  ],
})
export class InvitationModule {}
