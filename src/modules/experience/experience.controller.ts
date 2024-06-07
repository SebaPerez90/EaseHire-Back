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
import { ExperienceService } from './experience.service';
import { ApiTags } from '@nestjs/swagger';
import { PostExperienceDto } from './dto/post-exp.dto';

@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}
  @Get()
  async getExperience() {
    return await this.experienceService.getExperiences();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  postExperience(@Body() experienceData: PostExperienceDto) {
    return this.experienceService.postExperience(experienceData);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateExperience(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() experienceData,
  ) {
    return this.experienceService.updateExperience(id, experienceData);
  }
  @Delete()
  deleteExperience() {
    return 'delete experience';
  }
}
