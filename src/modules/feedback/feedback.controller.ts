import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Request } from 'express';
import { PostFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from 'src/database/entities/feedback.entity';
import { Public } from 'src/decorators/is-public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  // @Roles(Role.USER)
  @Public()
  getAllFeedbacks() {
    return this.feedbackService.getAllFeedbacks();
  }

  /*
   * Filtro de palabras obsenas
   */
  // @Get(':id')
  // // @Roles(Role.USER)
  // @Public()
  // getFeedback(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.feedbackService.getFeedback(id);
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  postFeedback(@Body() feedbackData: PostFeedbackDto, @Req() req: Request) {
    return this.feedbackService.postFeedback(feedbackData, req);
  }

  @Patch(':id')
  // @Roles(Role.USER)
  @Public()
  editFeedback(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() feedbackData: Partial<Feedback>,
  ) {
    return this.feedbackService.editFeedback(feedbackData, id);
  }

  @Delete(':id')
  // @Roles(Role.ADMIN)
  @Public()
  removeFeedback(@Param('id', ParseUUIDPipe) id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}
