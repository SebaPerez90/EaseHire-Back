import { Module } from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { ProfesionsController } from './profesions.controller';
import { ProfesionsRepository } from './profesions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesion } from 'src/database/entities/profesion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Profesion])],
  controllers: [ProfesionsController],
  providers: [ProfesionsService, ProfesionsRepository],
})
export class ProfesionsModule {}
