import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from 'src/database/entities/invitation.entity';
import { Repository } from 'typeorm';
import { PostInvitationDto } from './dto/post-invitation.dto';
import { UpdateInvitationDto } from './dto/patch-invitation.dto';
import { JobState } from 'src/enum/job-state.enum';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  async getAllInvitations() {
    const invitatios = await this.invitationRepository.find({
      relations: { invitationOwner: true, employee: true },
    });
    if (invitatios.length === 0)
      throw new NotFoundException('there are no invitations made yet');
    return invitatios;
  }
  async postInvitation(invitationData: PostInvitationDto, req) {
    const invitation = new Invitation();
    invitation.jobDescription = invitationData.jobDescription;
    invitation.payPerHour = invitationData.payPerHour;
    invitation.issue = invitationData.issue;
    invitation.location = invitationData.location;
    invitation.isRemote = invitationData.isRemote;
    invitation.startDate = invitationData.startDate;
    invitation.invitationOwner = req.currentUser;
    await this.invitationRepository.save(invitation);
    return { message: 'The new invitation has been created', invitation };
  }

  async updateInvitation(id: string, invitationData: UpdateInvitationDto) {
    const invitationFounded: Invitation =
      await this.invitationRepository.findOneBy({
        id: id,
      });
    if (!invitationFounded)
      throw new NotFoundException(`The invitation was not found or not exist`);

    const update = this.invitationRepository.merge(
      invitationFounded,
      invitationData,
    );
    const invitation = await this.invitationRepository.save(update);
    return {
      message: 'Your job invitation has been modified successfully',
      invitation,
    };
  }

  async aceptOfferJob(id: string, req) {
    const invitationFounded: Invitation =
      await this.invitationRepository.findOneBy({
        id: id,
      });
    if (!invitationFounded)
      throw new NotFoundException(`The offer job was not found or not exist`);

    invitationFounded.employee = req.currentUser;
    invitationFounded.jobState = JobState.ACCEPTED;
    await this.invitationRepository.save(invitationFounded);
    return {
      message: 'Your job invitation has been modified successfully',
      invitationFounded,
    };
  }
}
