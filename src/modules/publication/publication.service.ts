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

  async create(createPublicationDto: CreatePublicationDto, file: Express.Multer.File) {
    const res = await this.publicationRepository.uploadImage(file);
    const publication = this.publicationRepository.create({
      ...createPublicationDto,
      imgUrl: res.secure_url,
    })
    return publication
  }

  update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return this.publicationRepository.update(id, updatePublicationDto);
  }

  remove(id: string) {
    return this.publicationRepository.remove(id);
  }
}