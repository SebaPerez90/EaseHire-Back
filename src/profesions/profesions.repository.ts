import { InjectRepository } from '@nestjs/typeorm';
import { Profesion } from 'src/database/entities/profesion.entity';
import { Repository } from 'typeorm';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import { BadRequestException } from '@nestjs/common';

export class ProfesionsRepository {
  constructor(
    @InjectRepository(Profesion)
    private profesionsRepository: Repository<Profesion>,
  ) {}

  async create(createProfesionDto: CreateProfesionDto) {
    return await this.profesionsRepository.save(createProfesionDto);
  }

  async remove(id: string) {
    const profesions = await this.profesionsRepository.delete({ id });

    return profesions;
  }

  async update(id: string, UpdateUserDto: UpdateProfesionDto) {
    await this.profesionsRepository.update(id, UpdateUserDto);
    const updateProfesions = await this.profesionsRepository.findOneBy({ id });
    return updateProfesions;
  } 


  async findProfesions(category: string, page: number, limit: number) {

    const skip = (page - 1) * limit;
    const ProfesionsFind = await this.profesionsRepository.find({
      where: { category: category },
      take: limit,
      skip: skip,
      relations: { user: true },
    })
    console.log(ProfesionsFind);

    if (ProfesionsFind.length == 0) throw new BadRequestException(`No found professions with category ${category}`);
  
    return ProfesionsFind;
  }
}
