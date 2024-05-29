import { Module } from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { ProfesionsController } from './profesions.controller';

@Module({
  controllers: [ProfesionsController],
  providers: [ProfesionsService],
})
export class ProfesionsModule {}
