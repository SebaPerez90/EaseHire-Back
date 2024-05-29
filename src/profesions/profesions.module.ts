import { Module } from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { ProfesionsController } from './profesions.controller';
import { ProfesionsRepository } from './profesions.repository';

@Module({
  controllers: [ProfesionsController],
  providers: [ProfesionsService, ProfesionsRepository],
})
export class ProfesionsModule {}
