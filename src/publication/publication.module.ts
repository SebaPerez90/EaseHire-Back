import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationsRepopsitory } from './publication.repository';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationsRepopsitory],
})
export class PublicationModule {}
