import { Module } from '@nestjs/common';
import { WorkHistoryController } from './work_history.controller';
import { WorkHistoryService } from './work_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work_History } from 'src/database/entities/workhistorial.entity';
import { Invitation } from 'src/database/entities/invitation.entity';
import { InvitationService } from '../invitation/invitation.service';
import { User } from 'src/database/entities/user.entity';
import { UserRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { ExperienceService } from '../experience/experience.service';
import { Experience } from 'src/database/entities/experience.entity';
import { Credential } from 'src/database/entities/credentials.entity';
import { AuthService } from '../auth/auth.service';
import { FeedbackService } from '../feedback/feedback.service';
import { Feedback } from 'src/database/entities/feedback.entity';
import { ProfesionsRepository } from '../profesions/profesions.repository';
import { Profesion } from 'src/database/entities/profesion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Work_History,
      Invitation,
      User,
      Experience,
      Credential,
      Feedback,
      Profesion,
    ]),
  ],
  controllers: [WorkHistoryController],
  providers: [
    WorkHistoryService,
    InvitationService,
    UserRepository,
    UsersService,
    ExperienceService,
    AuthService,
    FeedbackService,
    ProfesionsRepository,
  ],
})
export class WorkHistoryModule {}
