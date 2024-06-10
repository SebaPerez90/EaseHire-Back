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

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  findAll() {
    return this.feedbackService.getAllFeedbacks();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  postFeedback(@Body() feedbackData: PostFeedbackDto, @Req() req: Request) {
    return this.feedbackService.postFeedback(feedbackData, req);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  editFeedback(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() feedbackData: Partial<Feedback>,
  ) {
    return this.feedbackService.editFeedback(feedbackData, id);
  }

  /*
  Este necesita revisión porque tiene un problema al ser 
  eliminado por la relacion a la tabla "experiences".
  pendiente a revisión
  */
  @Delete(':id')
  removeFeedback(@Param('id', ParseUUIDPipe) id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}
