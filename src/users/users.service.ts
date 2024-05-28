import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReposiroty } from './users.repository';

@Injectable()
export class UsersService {
  findallprofession(profession: string) {
    return this.usersRepository.findallprofession(profession);
  }
  constructor(private readonly usersRepository: UserReposiroty) {}
  create(createUserDto: CreateUserDto) {
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
  }
}
