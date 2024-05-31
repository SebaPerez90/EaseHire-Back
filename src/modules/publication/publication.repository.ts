import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdateProfesionDto } from 'src/modules/profesions/dto/update-profesion.dto';
import { BadRequestException } from '@nestjs/common';
import * as moment from 'moment';

export class PublicationsRepository {
  constructor(
    @InjectRepository(Publicaction)
    private publicationsRepository: Repository<Publicaction>,
  ) {}

  async create(createPublication: CreatePublicationDto) {
    const date = new Date();
    const formatDate = date.toLocaleDateString();
    const formatTime = date.toLocaleTimeString();

    const newPublication = await this.publicationsRepository.create({
      title: createPublication.title,
      description: createPublication.description,
      imgUrl: createPublication.imgUrl,
      date: formatDate,
      time: formatTime,
    });

    const timelapsed = moment(newPublication.date).fromNow();
    newPublication.timelapse = timelapsed;

    const publications = await this.publicationsRepository.save(newPublication);
    return publications;
  }

  async findAll() {
    return await this.publicationsRepository.find();
  }

  async findPrublications(
    category: string,
    city: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category && city) {
      where.profesion = { category: category };
      where.user = { city: city };
    } else if (category) {
      where.profesion = { category: category };
    } else if (city) {
      where.user = { city: city };
    }

    const publicationsFind = await this.publicationsRepository.find({
      relations: {
        profesion: true,
        user: true,
      },
      where,
      take: limit,
      skip: skip,
    });

    if (publicationsFind.length == 0)
      throw new BadRequestException(
        `No publications found with the provided filters`,
      );

    return publicationsFind;
  }

  async update(id: string, updatePublication: UpdateProfesionDto) {
    return await this.publicationsRepository.update(id, updatePublication);
  }
  async remove(id: string) {
    return await this.publicationsRepository.delete(id);
  }
}
