import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { CreateProfesionDto } from './dto/create-profesion.dto';
import { UpdateProfesionDto } from './dto/update-profesion.dto';

@Controller('profesions')
export class ProfesionsController {
  constructor(private readonly profesionsService: ProfesionsService) {}

  @Post()
  create(@Body() createProfesionDto: CreateProfesionDto) {
    return this.profesionsService.create(createProfesionDto);
  }

  @Get()
  findAll() {
    return this.profesionsService.findAll();
  }

  @Get(':category')
  findAllProfesions(@Param('category') category: string) {
    return this.profesionsService.findAllProfesions(category);
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
