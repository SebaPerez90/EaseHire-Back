import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserReposiroty {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async findallprofession(profession: string) {
    const usersProfesional = await this.usersRepository.find({
      where: { profession },
    });

    return usersProfesional;
  }
  async removeUsers(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    user.available = false;
    return user;
  }
  async updateUser(id: string, UpdateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, UpdateUserDto);
    const updateUser = await this.usersRepository.findOneBy({ id });
    return updateUser;
  }
  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
  }
  async createUsers(createUserDto) {
    const user = await this.usersRepository.save(createUserDto);
    return user;
  }
  async findAll() {
    const users = await this.usersRepository.find({
      where: { available: true },
    });
    return users;
  }
}
