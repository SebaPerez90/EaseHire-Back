import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from '../../utils/mock-users.json';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  onModuleInit() {
    this.seederUser();
  }
  async getAllusers(
    category: string,
    city: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (category && city) {
      where.profesions = { category: category };
      where.city = city;
    } else if (category) {
      where.profesions = { category: category };
    } else if (city) {
      where.city = city;
    }

    const [usersFind, count] = await this.usersRepository.findAndCount({
      relations: { profesions: true, experiences: true, educations: true },
      where,
      take: limit,
      skip: skip,
    });

    if (usersFind.length === 0)
      throw new NotFoundException(`No users were found whith those parameters`);
    return { usersFind, count };
  }

  async getMyProfile(req) {
    return await this.usersRepository.findOneBy({
      id: req.currentUser.id,
    });
  }

  async seederUser() {
    const promises = data?.map(async (element) => {
      const user = new User();
      user.name = element.name;
      user.lastName = element.lastName;
      user.dni = element.dni;
      user.country = element.country;
      user.city = element.city;
      user.birthdate = element.birthdate;
      user.bio = element.bio;
      user.email = element.email;

      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .orUpdate(
          [
            'name',
            'lastName',
            'dni',
            'country',
            'city',
            'birthdate',
            'bio',
            'email',
          ],
          ['dni'],
        )
        .execute();
    });
    await Promise.all(promises);
    return {
      message: 'users was seeder successfully!',
    };
  }

  // async createUser(email: string, password: string) {}
  // async findAll() {
  //   const users = await this.usersRepository.find({
  //     relations: { experiences: true, educations: true, profesions: true },
  //   });

  //   const filteredUsers: User[] = [];
  //   users.map((element) => {
  //     if (element.isBlocked === false) {
  //       filteredUsers.push(element);
  //     }
  //   });
  //   return filteredUsers;
  // }

  // async updateUser(id: string, UpdateUserDto: UpdateUserDto) {
  //   const userFounded = await this.usersRepository.findOneBy({ id: id });
  //   if (!userFounded) throw new NotFoundException(`No found user con id ${id}`);

  //   const user = await this.usersRepository.find();
  //   for (let i = 0; i < user.length; i++) {
  //     const dni = user[i].dni;
  //     if (UpdateUserDto.dni === dni)
  //       throw new BadRequestException(
  //         'Plis check dni entry. The "dni" must be unique',
  //       );
  //   }
  //   const updates = this.usersRepository.merge(userFounded, UpdateUserDto);
  //   await this.usersRepository.save(updates);
  //   return userFounded;
  // }

  // async filterNewMembers() {
  //   const users = await this.usersRepository.find({
  //     relations: { experiences: true },
  //   });

  //   for (let i = 0; i < users.length; i++) {
  //     if (!(users[i].experiences.length === 0)) {
  //       await this.usersRepository.update(
  //         { id: users[i].id },
  //         { newMember: false },
  //       );
  //     }
  //   }
  // }

  // async averageRate() {
  //   const users = await this.usersRepository.find();

  //   for (let i = 0; i < users.length; i++) {
  //     const rates = users[i].professionalRate;

  //     const totalRate = rates.reduce(
  //       (accumulator, currentRate) => Number(accumulator) + Number(currentRate),
  //     );

  //     const average = totalRate / rates.length;
  //     users[i].professionalRate = [average];
  //     await this.usersRepository.save(users[i]);
  //   }
  // }

  // async calculateProfesionalRate() {
  //   const users = await this.usersRepository.find({
  //     relations: { experiences: { feedback: true } },
  //   });

  //   for (let i = 0; i < users.length; i++) {
  //     for (let j = 0; j < users[i].experiences.length; j++) {
  //       const experience = users[i].experiences[j];

  //       if (experience.feedback) {
  //         users[i].professionalRate.push(experience.feedback.rate);
  //         await this.usersRepository.save(users[i]);
  //       }
  //     }
  //   }
  // }
}
