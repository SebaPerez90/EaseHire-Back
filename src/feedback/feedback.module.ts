import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/database/entities/feedback.entity';
import { FeedbackRepository } from './feedback.repository';
import { Profesion } from 'src/database/entities/profesion.entity';
import { ProfesionsRepository } from 'src/profesions/profesions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Profesion])],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository], 
})
export class FeedbackModule {}
