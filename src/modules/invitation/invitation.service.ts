import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from 'src/database/entities/invitation.entity';
import { Repository } from 'typeorm';
import { PostInvitationDto } from './dto/post-invitation.dto';
import { UpdateInvitationDto } from './dto/patch-invitation.dto';
import { JobState } from 'src/enum/job-state.enum';
import { User } from 'src/database/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    private userService: UsersService,
  ) {}

  async getAllInvitations() {
    return await this.invitationRepository.find({
      relations: { employee: true, invitationOwner: true },
    });
  }
  async postInvitation(id: string, invitationData: PostInvitationDto, req) {
    const arrUsers: User[] = [];
    const invitation = new Invitation();
    const user = await this.userService.findOne(id);
    arrUsers.push(req.currentUser);
    invitation.jobDescription = invitationData.jobDescription;
    invitation.payPerHour = invitationData.payPerHour;
    invitation.issue = invitationData.issue;
    invitation.location = invitationData.location;
    invitation.isRemote = invitationData.isRemote;
    invitation.startDate = invitationData.startDate;
    invitation.invitationOwner = arrUsers;
    invitation.employee = user;

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
