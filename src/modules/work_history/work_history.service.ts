import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work_History } from 'src/database/entities/workhistorial.entity';
import { Repository } from 'typeorm';
import { InvitationService } from '../invitation/invitation.service';
import { Invitation } from 'src/database/entities/invitation.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class WorkHistoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Work_History)
    private workHistoryRepository: Repository<Work_History>,
    private invitationService: InvitationService,
  ) {}

  async getAllWorkHistory(req) {
    const invitations = await this.invitationService.getOffers(req);
    const work_history = new Work_History();
    const finishedWorks: Invitation[] = [];

    invitations.map((element) => {
      if (element.jobState === 'FINISHED') {
        finishedWorks.push(element);
      }
    });

    //!CORREJIR LA RELACION
    work_history.invitations = finishedWorks;
    work_history.user = await this.userRepository.findOneBy({
      id: req.currentUser.id,
    });
    await this.workHistoryRepository.save(work_history);
    return work_history;
  }

  async giveFeedback(feedback) {}
}
