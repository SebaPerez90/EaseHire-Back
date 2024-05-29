import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationsRepository) {}
  create(createPublicationDto: CreatePublicationDto) {
    return this.publicationRepository.create(createPublicationDto);
  }

  findAll() {
    return this.publicationRepository.findAll();
  }

  findOne(id: string) {
    return this.publicationRepository.findOne(id);
  }

  update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return this.publicationRepository.update(id, updatePublicationDto);
  }

  remove(id: string) {
    return this.publicationRepository.remove(id);
  }
}
