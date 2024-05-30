import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdateProfesionDto } from 'src/profesions/dto/update-profesion.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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


  async findPrublications(category: string, city: string, page: number, limit: number) {

    const skip = (page - 1) * limit;

    const publicationsFind = await this.publicationsRepository.find({
   /*    where: { category: category }, */
      take: limit,
      skip: skip,
      relations: { user: true },
    })

    if (publicationsFind.length == 0) throw new BadRequestException(`No found publication with category ${category}`);
  
    return publicationsFind;

  }



/*   async update(id: string, updatePublication: UpdateProfesionDto) {
    return await this.publicationsRepository.update(id, updatePublication);
  }
  async remove(id: string) {
    return await this.publicationsRepository.delete(id);
  } */
}
