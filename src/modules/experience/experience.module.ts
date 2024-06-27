import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { Experience } from 'src/database/entities/experience.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Credential } from 'src/database/entities/credentials.entity';
import { Profesion } from 'src/database/entities/profession.entity';
import { FeedbackService } from '../feedback/feedback.service';
import { Feedback } from 'src/database/entities/feedback.entity';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Experience,
      User,
      Credential,
      Profesion,
      Feedback,
    ]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService, AuthService, FeedbackService],
})
export class ExperienceModule {}
