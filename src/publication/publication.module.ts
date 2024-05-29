import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationsRepository } from './publication.repository';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationsRepository],
})
export class PublicationModule {}
