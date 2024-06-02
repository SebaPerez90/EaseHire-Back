import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'src/database/entities/education.entity';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/database/entities/user.entity';
import { AuthRepository } from '../auth/auth.repository';
import { Credential } from 'src/database/entities/credentials.entity';
import { Experience } from 'src/database/entities/experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Education, User, Credential, Experience]),
  ],
  controllers: [EducationController],
  providers: [EducationService, UserRepository, AuthRepository],
})
export class EducationModule {}
