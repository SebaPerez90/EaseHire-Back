import { Module } from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { ProfesionsController } from './profesions.controller';
import { ProfesionsRepository } from './profesions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesion } from 'src/database/entities/profesion.entity';
import { User } from 'src/database/entities/user.entity';
import { UserRepository } from 'src/modules/users/users.repository';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { Credential } from 'src/database/entities/credentials.entity';
import { Experience } from 'src/database/entities/experience.entity';
import { ExperienceService } from '../experience/experience.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesion, User, Credential, Experience]),
  ],
  controllers: [ProfesionsController],
  providers: [
    ProfesionsService,
    ProfesionsRepository,
    UserRepository,
    AuthRepository,
    ExperienceService,
  ],
})
export class ProfesionsModule {}
