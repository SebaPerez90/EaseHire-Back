import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationsRepository) {}

  findAll() {
    return this.publicationRepository.findAll();
  }

  findPrublications(
    category: string,
    city: string,
    page: number,
    limit: number,
  ) {
    return this.publicationRepository.findPrublications(
      category,
      city,
      page,
      limit,
    );
  }

  create(createPublicationDto: CreatePublicationDto) {
    return this.publicationRepository.create(createPublicationDto);
  }

  update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return this.publicationRepository.update(id, updatePublicationDto);
  }

  remove(id: string) {
    return this.publicationRepository.remove(id);
  }
}