import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  findUsers(category: string, city: string, page: number, limit: number) {
    return this.usersRepository.findUsers(category, city, page, limit);
  }

/*   create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUsers(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.removeUsers(id);
  } */
} 
