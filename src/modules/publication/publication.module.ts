import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationsRepository } from './publication.repository';
import { Publicaction } from 'src/database/entities/publication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/database/entities/user.entity';
import { AuthRepository } from '../auth/auth.repository';
import { Credential } from 'src/database/entities/credentials.entity';
import { ProfesionsRepository } from '../profesions/profesions.repository';
import { Profesion } from 'src/database/entities/profesion.entity';
import { Experience } from 'src/database/entities/experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Publicaction,
      User,
      Credential,
      Profesion,
      Experience,
    ]),
  ],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    PublicationsRepository,
    UserRepository,
    AuthRepository,
    ProfesionsRepository,
  ],
})
export class PublicationModule {}
