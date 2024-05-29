import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';

export class PublicationsRepository {
  constructor(
    @InjectRepository(Publicaction)
    private publicationsRepository: Repository<Publicaction>,
  ) {}

  async create(createPublication: CreatePublicationDto) {
    const newPublication = await this.publicationsRepository.create({
      title: createPublication.title,
      description: createPublication.description,
      imgUrl: createPublication.imgUrl,
      date: new Date(),
    });
    const publications = await this.publicationsRepository.save(newPublication);
    return publications;
  }
  async findAll() {
    return await this.publicationsRepository.find();
  }
  async findOne(id: number) {
    return await this.publicationsRepository.findOneBy({ id });
  }
  async update(id: number, updatePublication: CreatePublicationDto) {
    return await this.publicationsRepository.update(id, updatePublication);
  }
  async remove(id: number) {
    return await this.publicationsRepository.delete(id);
  }
}
