import { Module } from '@nestjs/common';
import { PostulationsController } from './postulations.controller';
import { PostulationsService } from './postulations.service';

@Module({
  controllers: [PostulationsController],
  providers: [PostulationsService],
})
export class PostulationsModule {}
