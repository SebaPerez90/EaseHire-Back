import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserReposiroty } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserReposiroty],
})
export class UsersModule {}
