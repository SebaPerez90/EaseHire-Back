import { Controller, Get, Patch, Post } from '@nestjs/common';
import { WorkHistoryService } from './work_history.service';
import { Public } from 'src/decorators/is-public.decorator';

@Controller('work-history')
export class WorkHistoryController {
  constructor(private workHistoryService: WorkHistoryService) {}
  @Get()
  @Public()
  getAllWorkHistory() {
    return this.workHistoryService.getAllWorkHistory();
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
  updateWorkHistory() {
    return 'update work history';
  }
}
