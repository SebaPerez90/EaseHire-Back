import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';

@Controller('profesions')
export class ProfesionsController {
  constructor(private readonly profesionsService: ProfesionsService) {}

  @Get()
  findProfesions(
    @Query('category') category: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.profesionsService.findProfesions(category, page, limit);
  }

  @Post()
  create(@Body() createProfesionDto: CreateProfesionDto) {
    return this.profesionsService.create(createProfesionDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfesionDto: UpdateProfesionDto,
  ) {
    return this.profesionsService.update(id, updateProfesionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesionsService.remove(id);
  }
}
