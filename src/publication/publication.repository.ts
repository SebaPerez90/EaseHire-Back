import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';

export class PublicationsRepopsitory {
  constructor(
    @InjectRepository(Publicaction)
    private publicationsRepository: Repository<Publicaction>,
  ) {}

  async create(createPublication: CreatePublicationDto) {
    return await this.publicationsRepository.save(createPublication);
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
