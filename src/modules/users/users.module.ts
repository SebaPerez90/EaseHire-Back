import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { Credential } from 'src/database/entities/credentials.entity';
import { Experience } from 'src/database/entities/experience.entity';
import { Profesion } from 'src/database/entities/profesion.entity';
import { Feedback } from 'src/database/entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, 
    Credential, 
    Experience,
    Profesion, 
    Feedback
  ])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, AuthRepository],
})
export class UsersModule {}
