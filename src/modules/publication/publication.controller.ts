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
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('publication')
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  
  @Get()
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findPrublications(
    @Query('category') category?: string,
    @Query('city') city?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.publicationService.findPrublications(
      category,
      city,
      page,
      limit,
    );
  }
  
    @Get()
    findAll() {
      return this.publicationService.findAll();
    }

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.create(createPublicationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.update(id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(id);
  }
}
