import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { Public } from 'src/decorators/is-public.decorator';
import { PostInvitationDto } from './dto/post-invitation.dto';
import { Request } from 'express';

@Controller('invitation')
export class InvitationController {
  constructor(private invitationService: InvitationService) {}
  @Get()
  getAllInvitations(@Req() req: Request) {
    return this.invitationService.getAllInvitations(req);
  }

  @Get(':id')
  getInvitation() {
    return 'Get Invitation';
  }

  @Post()
  @Public()
  postInvitation(
    @Body() invitationData: PostInvitationDto,
    @Req() req: Request,
  ) {
    return this.invitationService.postInvitation(invitationData, req);
  }

  @Patch()
  updateInvitation() {
    return 'Update Invitation';
  }

  @Delete(':id')
  deleteInvitation() {
    return 'Delete Invitation';
  }
}
