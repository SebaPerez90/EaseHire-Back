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
  findAllId(userid: any) {
    throw this.publicationRepository.findAllId(userid);
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

  findAllCategories() {
    return this.publicationRepository.findAllCategories();
  }

  findAllPublications() {
    return this.publicationRepository.findAllPublications();
  }
  async create(
    createPublicationDto: CreatePublicationDto,
    file: Express.Multer.File,
    userid: any,
  ) {
    const res = await this.publicationRepository.uploadImage(file);
    // const publication = await this.publicationRepository.create({
    //   ...createPublicationDto,
    //   imgUrl: res.secure_url,
    //   user:userid,
    // });
    return this.publicationRepository.create(createPublicationDto, res, userid);
  }

  update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return this.publicationRepository.update(id, updatePublicationDto);
  }

  remove(id: string) {
    return this.publicationRepository.remove(id);
  }
}
