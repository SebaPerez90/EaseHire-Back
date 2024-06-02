import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  findUsers(category: string, city: string, page: number, limit: number) {
    return this.usersRepository.findUsers(category, city, page, limit);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async create(createUserDto: CreateUserDto) {
    
    const user = await this.usersRepository.findOne(createUserDto.dni);
    if (user) throw new BadGatewayException('User already exists');
    return await this.usersRepository.createUsers(createUserDto);
  }

  async findOneid(id: string) {
    return await this.usersRepository.findOneid(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.removeUsers(id);
  }
}
