import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work_History } from 'src/database/entities/workhistorial.entity';
import { Repository } from 'typeorm';
import { InvitationService } from '../invitation/invitation.service';

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(Work_History)
    private workHistoryRepository: Repository<Work_History>,
    private invitationService: InvitationService,
  ) {}

  async getAllWorkHistory() {
    const invitations = await this.invitationService.getAllInvitations();

    return invitations.map((element) => element.jobState);
  }
}
