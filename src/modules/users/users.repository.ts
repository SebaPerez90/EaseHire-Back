import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import * as data from '../../utils/mock-users.json';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { Experience } from 'src/database/entities/experience.entity';
import { Profesion } from 'src/database/entities/profesion.entity';


@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authRepository: AuthRepository,
    @InjectRepository(Profesion)
    private profesionRepository: Repository<Profesion>,
  ) {}

  async removeUsers(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`No found user con id ${id}`);
    return user;
  }

  async updateUser(id: string, UpdateUserDto: any) {
    await this.usersRepository.update(id, UpdateUserDto);
    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser) throw new NotFoundException(`No found user con id ${id}`);
    return updateUser;
  }

  async findOne(dni: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { dni } });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async findOneid(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async createUsers(createUserDto) {
    const user = await this.usersRepository.save(createUserDto);
    const profesion = await this.profesionRepository.save({
      user: createUserDto.id,
      category: createUserDto.category,
    });

    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: { experiences: true },
      
    });
    return users;
  }

  async findUsers(category: string, city: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (category && city) {
      where.profesions = { category: category };
      where.city = city;
    } else if (category) {
      where.profesions = { category: category };
    } else if (city) {
      where.city = city;
    }

    const usersFind = await this.usersRepository.find({
      relations: { profesions: true, experiences: true },
      where,
      take: limit,
      skip: skip,
    });
    if (usersFind.length == 0)
      throw new BadRequestException(`No users found with the provided filters`);

    return usersFind;
  }

  async test() {
    const users = await this.usersRepository.find();
    return users.map((item) => item.professionalRate);
  }

  async filterNewMembers() {
    const users = await this.usersRepository.find({
      relations: { experiences: true },
    });

    for (let i = 0; i < users.length; i++) {
      if (!(users[i].experiences.length === 0)) {
        await this.usersRepository.update(
          { id: users[i].id },
          { newMember: false },
        );
      }
    }
  }

  async averageRate() {
    const users = await this.usersRepository.find();

    for (let i = 0; i < users.length; i++) {
      const rates = users[i].professionalRate;

      const totalRate = rates.reduce(
        (accumulator, currentRate) => Number(accumulator) + Number(currentRate),
      );

      const average = totalRate / rates.length;
      users[i].professionalRate = [average];
      await this.usersRepository.save(users[i]);
      console.log(users[i].professionalRate);
    }
  }

  async calculateProfesionalRate() {
    const users = await this.usersRepository.find({
      relations: { experiences: { feedback: true } },
    });

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users[i].experiences.length; j++) {
        const experience = users[i].experiences[j];

        if (experience.feedback) {
          users[i].professionalRate.push(experience.feedback.rate);
          await this.usersRepository.save(users[i]);
        }
      }
    }
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
      user.credential = await this.authRepository.simulateAuthFlow(element);

      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .orUpdate(
          ['name', 'lastName', 'dni', 'country', 'city', 'birthdate'],
          ['dni'],
        )
        .execute();
    });
    await Promise.all(promises);

    return {
      message: 'users was seeder successfully!',
    };
  }
}
