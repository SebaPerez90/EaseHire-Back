import { InjectRepository } from '@nestjs/typeorm';
import { Profesion } from 'src/database/entities/profesion.entity';
import { Repository } from 'typeorm';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';

export class ProfesionsRepository {
  constructor(
    @InjectRepository(Profesion)
    private profesionsRepository: Repository<Profesion>,
  ) {}

  async create(createProfesionDto: CreateProfesionDto) {
    return await this.profesionsRepository.save(createProfesionDto);
  }
  async findAll() {
    const profesions = await this.profesionsRepository.find();

    return profesions;
  }
  async remove(id: number) {
    const profesions = await this.profesionsRepository.delete({ id });

    return profesions;
  }
  async update(id: number, UpdateUserDto: UpdateProfesionDto) {
    await this.profesionsRepository.update(id, UpdateUserDto);
    const updateProfesions = await this.profesionsRepository.findOneBy({ id });
    return updateProfesions;
  }
  async findAllProfesions(category: string) {
    const profesions = await this.profesionsRepository.findOneBy({ category });
    return profesions;
  }
}
