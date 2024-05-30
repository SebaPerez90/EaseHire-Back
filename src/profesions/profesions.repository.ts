import { InjectRepository } from '@nestjs/typeorm';
import { Profesion } from 'src/database/entities/profesion.entity';
import { Repository } from 'typeorm';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';
import * as data from '../utils/mock-professions.json';
import { UserRepository } from 'src/users/users.repository';

export class ProfesionsRepository {
  constructor(
    @InjectRepository(Profesion)
    private profesionsRepository: Repository<Profesion>,
    private userRepository: UserRepository,
  ) {}

  async seederProfesions() {
    const users = await this.userRepository.findAll();
    data?.map(async (element) => {
      const profession = new Profesion();
      profession.category = element.category;
      profession.user = users[Math.round(Math.random() * 30)];

      await this.profesionsRepository.save(profession);
    });
  }

  async create(createProfesionDto: CreateProfesionDto) {
    return await this.profesionsRepository.save(createProfesionDto);
  }
  async findAll() {
    const profesions = await this.profesionsRepository.find();

    return profesions;
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
  async findAllProfesions(category: string) {
    const profesions = await this.profesionsRepository.findOneBy({ category });
    return profesions;
  }
}
