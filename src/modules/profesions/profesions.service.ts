import {
  // BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ExperienceService } from '../experience/experience.service';
import { FeedbackService } from '../feedback/feedback.service';
import { Profesion } from 'src/database/entities/profesion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import * as data from '../../utils/mock-professions.json';

@Injectable()
export class ProfesionsService implements OnModuleInit {
  constructor(
    @InjectRepository(Profesion)
    private profesionsRepository: Repository<Profesion>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private experienceService: ExperienceService,
    private feedbackService: FeedbackService,
  ) {}

  async onModuleInit() {
    // await this.userRepository.seederUser();
    await this.feedbackService.seederFeedbacks();
    await this.seederProfesions();
    await this.experienceService.seedExperiences();
    // await this.userRepository.filterNewMembers();
  }

  async findProfesions() {
    const ProfesionsFind = await this.profesionsRepository.find();
    return ProfesionsFind;
  }

  // async meProfesion(userid, body) {
  //   const userFind = await this.userRepository.findOne(userid);
  //   const newProfesion = await this.profesionsRepository.findOneBy({
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

  async removeProfesion(req, categoryName) {
    const userFind = await this.userRepository.findOne({
      where: { id: req.currentUser.id },
      relations: { profesions: true },
    });
    const profesionFind = await this.profesionsRepository.findOneBy({
      category: categoryName,
    });

    if (!profesionFind) throw new NotFoundException(`Profesion not found`);

    for (let i = 0; i < userFind.profesions.length; i++) {
      if (userFind.profesions[i].category === profesionFind.category) {
        userFind.profesions.splice(i, 1);
      }
    }
    const userFinal = await this.userRepository.save(userFind);
    return userFinal;
  }

  async seederProfesions() {
    const users = await this.userRepository.find();
    data?.map(async (element) => {
      const profession = new Profesion();
      profession.category = element.category;
      profession.user = users[Math.round(Math.random() * 30)];

      await this.profesionsRepository.save(profession);
    });
  }
}
