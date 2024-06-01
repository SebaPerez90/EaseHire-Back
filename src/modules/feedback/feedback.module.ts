import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Profesion } from 'src/database/entities/profesion.entity';
import { User } from 'src/database/entities/user.entity';
import { Experience } from 'src/database/entities/experience.entity';
import { ExperienceService } from '../experience/experience.service';
import { UserRepository } from '../users/users.repository';
import { ProfesionsRepository } from '../profesions/profesions.repository';
import { AuthRepository } from '../auth/auth.repository';
import { Credential } from 'src/database/entities/credentials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Feedback,
      Profesion,
      User,
      Experience,
      Credential,
    ]),
  ],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    ExperienceService,
    UserRepository,
    ProfesionsRepository,
    AuthRepository,
  ],
})
export class FeedbackModule {}
