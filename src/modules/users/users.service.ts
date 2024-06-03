import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { ExperienceService } from '../experience/experience.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserRepository,
    private experieceService: ExperienceService,
  ) {}

  findUsers(category: string, city: string, page: number, limit: number) {
    this.usersRepository.calculateProfesionalRate();
    setTimeout(async () => {
      await this.usersRepository.averageRate();
    }, 1000);

    return this.usersRepository.findUsers(category, city, page, limit);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUsers(createUserDto);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.removeUsers(id);
  }

  async averageRate() {
    return await this.usersRepository.averageRate();
  }
}