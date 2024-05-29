import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositoty } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepositoty],
})
export class UsersModule {}
