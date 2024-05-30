import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdateProfesionDto } from 'src/profesions/dto/update-profesion.dto';
import { NotFoundException } from '@nestjs/common';

export class PublicationsRepository {
  constructor(
    @InjectRepository(Publicaction)
    private publicationsRepository: Repository<Publicaction>,
  ) {}

/*   async create(createPublication: CreatePublicationDto) {
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
  } */


  async findPrublications(id: string, page: number, limit: number) {
    const publications = await this.publicationsRepository.findOneBy({ id });
    if (!publications)
      throw new NotFoundException(`Not found publication ${id}`);
  }



/*   async update(id: string, updatePublication: UpdateProfesionDto) {
    return await this.publicationsRepository.update(id, updatePublication);
  }
  async remove(id: string) {
    return await this.publicationsRepository.delete(id);
  } */
}
