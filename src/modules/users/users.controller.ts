import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/is-public.decorator';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  getAllusers(
    @Query('category') category: string,
    @Query('city') city: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.usersService.getAllusers(category, city, page, limit);
  }

  @Get('/me')
  getMyProfile(@Req() req: Request) {
    return this.usersService.getMyProfile(req);
  }
}
