import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { PostInvitationDto } from './dto/post-invitation.dto';
import { Request } from 'express';
import { UpdateInvitationDto } from './dto/patch-invitation.dto';
import { Public } from 'src/decorators/is-public.decorator';

@Controller('invitation')
export class InvitationController {
  constructor(private invitationService: InvitationService) {}
  @Get()
  getAllInvitations() {
    return this.invitationService.getAllInvitations();
  }
  @Get('offers/:id')
  @Public()
  getOffers(@Param('id', ParseUUIDPipe) id: string) {
    return this.invitationService.getOffers(id);
  }

  @Get(':id')
  aceptOfferJob(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.invitationService.aceptOfferJob(id, req);
  }

  @Post(':id')
  postInvitation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    invitationData: PostInvitationDto,
    @Req() req: Request,
  ) {
    return this.invitationService.postInvitation(id, invitationData, req);
  }

  @Patch(':id')
  updateInvitation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() invitationData: UpdateInvitationDto,
  ) {
    return this.invitationService.updateInvitation(id, invitationData);
  }

  @Delete(':id')
  deleteInvitation() {
    return 'Delete Invitation';
  }
}
