import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { Publicaction } from 'src/database/entities/publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Credential } from 'src/database/entities/credentials.entity';
import { Profesion } from 'src/database/entities/profession.entity';
import { Experience } from 'src/database/entities/experience.entity';
import { cloudinaryConfig } from 'src/database/config/cloudinary';
import { AuthService } from '../auth/auth.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from 'src/database/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Publicaction,
      User,
      Credential,
      Profesion,
      Experience,
      Notification,
    ]),
  ],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    AuthService,
    cloudinaryConfig,
    NotificationsService,
  ],
})
export class PublicationModule {}
