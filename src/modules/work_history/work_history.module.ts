import { Module } from '@nestjs/common';
import { WorkHistoryController } from './work_history.controller';
import { WorkHistoryService } from './work_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work_History } from 'src/database/entities/workhistorial.entity';
import { Invitation } from 'src/database/entities/invitation.entity';
import { InvitationService } from '../invitation/invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Work_History, Invitation])],
  controllers: [WorkHistoryController],
  providers: [WorkHistoryService, InvitationService],
})
export class WorkHistoryModule {}
