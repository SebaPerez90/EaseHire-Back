import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get()
  async getStudies() {
    return await this.educationService.getAllEducations();
  }

  @Post()
  create() {
    return 'create a study';
  }

  @Patch()
  update() {
    return 'update a study';
  }

  @Delete()
  delete() {
    return 'delete a study';
  }
}
