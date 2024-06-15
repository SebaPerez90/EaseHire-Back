import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { WorkHistoryService } from './work_history.service';
import { Public } from 'src/decorators/is-public.decorator';
import { Request } from 'express';

@Controller('work-history')
export class WorkHistoryController {
  constructor(private workHistoryService: WorkHistoryService) {}
  @Get()
  @Public()
  getAllWorkHistory(@Req() req: Request) {
    return this.workHistoryService.getAllWorkHistory(req);
  }
  @Get('id')
  getWorkHistory() {
    return 'get by id';
  }

  @Post()
  postWorkHistory() {
    return 'post work history';
  }

  @Patch(':id')
  giveFeedback(@Body() feedback) {
    return this.workHistoryService.giveFeedback(feedback);
  }
}
