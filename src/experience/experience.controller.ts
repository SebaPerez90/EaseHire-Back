import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}
  @Get()
  async getExperience() {
    return await this.experienceService.getExperiences();
  }

  @Post()
  postExperience() {
    return 'post experience';
  }

  @Patch()
  patchExperience() {
    return 'patch experience';
  }
  @Delete()
  deleteExperience() {
    return 'delete experience';
  }
}
