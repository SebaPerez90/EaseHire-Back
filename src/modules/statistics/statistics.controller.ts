import {
  Controller,
  Get,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('statistics')
@Roles(Role.ADMIN)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('days')
  foundUsersByDays() {
    return this.statisticsService.foundUsersByDays();
  }
  @Get('week')
  foundUserWeek() {
    return this.statisticsService.foundUserWeek();
  }
  @Get('month')
  foundUsersByMonth() {
    return this.statisticsService.foundUsersByMonth();
  }
}
