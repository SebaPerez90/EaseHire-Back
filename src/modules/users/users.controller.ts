import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/is-public.decorator';

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

  @Get('blocks')
  @Public()
  getAllBlocks() {
    return this.usersService.getAllBlocks();
  }

  @Get('all')
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Public()
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  @Public()
  blockUser(@Param('id') id: string) {
    return this.usersService.blockUser(id);
  }
}
