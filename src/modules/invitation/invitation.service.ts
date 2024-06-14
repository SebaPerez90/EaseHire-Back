import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from 'src/database/entities/invitation.entity';
import { Repository } from 'typeorm';
import { PostInvitationDto } from './dto/post-invitation.dto';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  async getAllInvitations(req) {
    console.log(req.currentUser);

    // return await this.invitationRepository.find();
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
}
