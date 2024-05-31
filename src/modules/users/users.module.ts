import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { AuthRepository } from 'src/modules/auth/auth.repository';
import { Credential } from 'src/database/entities/credentials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credential])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, AuthRepository],
})
export class UsersModule {}
