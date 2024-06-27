import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Profesion } from 'src/database/entities/profession.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import * as data from '../../utils/mock-professions.json';
import { PostCategory } from './dto/post-category.dto';

@Injectable()
export class ProfesionsService implements OnModuleInit {
  constructor(
    @InjectRepository(Profesion)
    private professionsRepository: Repository<Profesion>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    data?.map(async (element) => {
      const users = await this.userRepository.find();
      const profession = new Profesion();
      profession.category = element.category;
      profession.user = users[Math.round(Math.random() * 20)];
      await this.professionsRepository.save(profession);
    });
  }

  async getAllProfessions() {
    const professions = await this.professionsRepository.find();
    if (professions.length === 0)
      throw new NotFoundException('the list of professions is still empty');

    return professions;
  }

  async addProfession(professionData: PostCategory) {
    const allProfessions = await this.professionsRepository.find();
    const profession = new Profesion();
    profession.category = professionData.category;

    for (let i = 0; i < allProfessions.length; i++) {
      if (allProfessions[i].category === professionData.category)
        throw new HttpException(
          'The category you are trying to add already exists.',
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
    const newProfession = await this.professionsRepository.save(profession);
    return newProfession;
  }
  // async meProfesion(userid, body) {
  //   const userFind = await this.userRepository.findOne(userid);
  //   const newProfesion = await this.professionsRepository.findOneBy({
  //     category: body.category,
  //   });

  //   if (!newProfesion) throw new NotFoundException(`Profesion not found`);

  //   userFind.profesions.find((element) => {
  //     if (element.category === newProfesion.category) {
  //       throw new BadRequestException(`Profesion already exist`);
  //     }
  //   });

  //   let userUpdate = new User();
  //   userUpdate = userFind;
  //   userUpdate.profesions = [...userFind.profesions, newProfesion];

  //   const userFinal = await this.userRepository.save(userUpdate);

  //   return userFinal;
  // }

  // async removeProfesion(req, categoryName) {
  //   const userFind = await this.userRepository.findOne({
  //     where: { id: req.currentUser.id },
  //     relations: { profesions: true },
  //   });
  //   const profesionFind = await this.professionsRepository.findOneBy({
  //     category: categoryName,
  //   });

  //   if (!profesionFind) throw new NotFoundException(`Profesion not found`);

  //   for (let i = 0; i < userFind.profesions.length; i++) {
  //     if (userFind.profesions[i].category === profesionFind.category) {
  //       userFind.profesions.splice(i, 1);
  //     }
  //   }
  //   const userFinal = await this.userRepository.save(userFind);
  //   return userFinal;
  // }
}
