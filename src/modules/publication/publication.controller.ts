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
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Headers,
} from "@nestjs/common";
import { PublicationService } from "./publication.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtService } from "@nestjs/jwt";
import { Public } from "src/decorators/is-public.decorator";

@ApiTags("publication")
@Controller("publication")
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private jwtService: JwtService
  ) {}

  @Get()
  @Public()
  @ApiQuery({ name: "category", required: false })
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  findPrublications(
    @Query("category") category?: string,
    @Query("city") city?: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit?: number
  ) {
    return this.publicationService.findPrublications(
      category,
      city,
      page,
      limit
    );
  }
  @Get("all")
  findAllId(@Headers() header, id: string) {
    console.log(`entramos en controeller publication`);

    const secret = process.env.JWT_SECRET;
    const { userid } = this.jwtService.verify(header.authorization, { secret });
    return this.publicationService.findAllId(userid);
  }

  @Public()
  @Get("category")
  findAllCategories() {
    return this.publicationService.findAllCategories();
  }

  @Public()
  @Get("allPublications")
  findAllPublications() {
    return this.publicationService.findAllPublications();
  }

  @Public()
  @Get(":id")
  findOnePublication(@Param("id") id: string) {
    return this.publicationService.findOnePublication(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @Headers() header,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: "El archivo es demasiado grande",
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|svg|webp)/,
          }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const secret = process.env.JWT_SECRET;
    console.log(`el token es :${header.authorization}`);

    const { userid } = this.jwtService.verify(header.authorization, { secret });

    return this.publicationService.create(createPublicationDto, file, userid);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePublicationDto: UpdatePublicationDto
  ) {
    return this.publicationService.update(id, updatePublicationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.publicationService.remove(id);
  }
}
