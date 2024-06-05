import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { PostEducationDto } from './dto/post-education.dto';
import { UpdateEducationDto } from './dto/update-education-dto';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get()
  getStudies() {
    return this.educationService.getAllEducations();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  postEducation(@Body() educationData: PostEducationDto) {
    return this.educationService.postEducation(educationData);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateEducation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() educationData: UpdateEducationDto,
  ) {
    return this.educationService.updateEducation(educationData, id);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteEducation(@Param('id', ParseUUIDPipe) id: string) {
    return this.educationService.deleteEducation(id);
  }
}
