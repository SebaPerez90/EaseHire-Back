import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  findAll() {
    return 'get all feeds';
  }
  @Post()
  create() {
    return 'create new feedback';
  }

  @Patch()
  update() {
    return 'update a feedback';
  }

  @Delete()
  remove() {
    return 'delete feedback';
  }
}
