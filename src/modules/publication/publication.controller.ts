import {
  Controller,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Headers,
  Post,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorators/is-public.decorator';

@Controller('publication')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @Public()
  findPrublications(
    @Query('category') category?: string,
    @Query('city') city?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    return this.publicationService.findPublications(
      category,
      city,
      page,
      limit,
    );
  }

  @Public()
  @Get('allPublications')
  findAllPublications() {
    return this.publicationService.findAllPublications();
  }

  @Public()
  @Get('premium')
  findAllPremium() {
    return this.publicationService.findAllPremium();
  }

  @Public()
  @Get(':id')
  findOnePublication(@Param('id') id: string) {
    return this.publicationService.findOnePublication(id);
  }
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // create(
  //   @Body() createPublicationDto: CreatePublicationDto,
  //   @Headers() header,
  //   @UploadedFile()
  //   file?: Express.Multer.File,
  // ) {
  //   const secret = process.env.JWT_SECRET;
  //   const { userid } = this.jwtService.verify(header.authorization, { secret });
  //   return this.publicationService.create(createPublicationDto, file, userid);
  // }

  // new ParseFilePipe({
  //   validators: [
  //     new MaxFileSizeValidator({
  //       maxSize: 200000,
  //       message: 'El archivo es demasiado grande',
  //     }),
  //     new FileTypeValidator({
  //       fileType: /(jpg|jpeg|png|svg|webp)/,
  //     }),
  //   ],
  // }),

  @Post('listMe/:id')
  listMe(@Param('id') id: string, @Headers() header) {
    const secret = process.env.JWT_SECRET;
    const { userid } = this.jwtService.verify(header.authorization, { secret });
    return this.publicationService.listMe(id, userid);
  }
}
