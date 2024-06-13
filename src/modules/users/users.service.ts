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

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUsers(createUserDto);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    let res = null;
    if (file) {
      res = await this.usersRepository.uploadImageUser(file);
    }
    return this.usersRepository.updateUser(id, updateUserDto, res);
  }

  // async test(id, userData) {
  //   const userFounded = await this.usersRepo.findOneBy({ id: id });
  //   if (!userFounded) throw new NotFoundException(`No found user con id ${id}`);

  //   const user = await this.usersRepo.find();
  //   for (let i = 0; i < user.length; i++) {
  //     const dni = user[i].dni;
  //     if (userData.dni === dni)
  //       throw new BadRequestException(
  //         'Plis check dni entry. The "dni" must be unique',
  //       );
  //   }
  //   const updates = this.usersRepo.merge(userFounded, userData);
  //   await this.usersRepo.save(updates);
  //   return userFounded;
  // }

  remove(id: string) {
    return this.usersRepository.removeUsers(id);
  }

  async averageRate() {
    return await this.usersRepository.averageRate();
  }
}
