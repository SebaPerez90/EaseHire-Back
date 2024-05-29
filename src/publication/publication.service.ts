import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepopsitory } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationsRepopsitory,
  ) {}
  create(createPublicationDto: CreatePublicationDto) {
    return this.publicationRepository.create(createPublicationDto);
  }

  findAll() {
    return this.publicationRepository.findAll();
  }

  findOne(id: number) {
    return this.publicationRepository.findOne(id);
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.publicationRepository.update(id, updatePublicationDto);
  }

  remove(id: number) {
    return this.publicationRepository.remove(id);
  }
}
