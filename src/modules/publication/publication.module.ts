import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationsRepository } from './publication.repository';
import { Publicaction } from 'src/database/entities/publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Publicaction])],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationsRepository],
})
export class PublicationModule {}
