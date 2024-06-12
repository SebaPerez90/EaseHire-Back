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
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorators/is-public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Roles } from 'src/decorators/role.decorator';
// import { Role } from 'src/enum/role.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @Public()
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findUsers(
    @Query('category') category: string,
    @Query('city') city: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.usersService.findUsers(category, city, page, limit);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('test')
  async averageRate() {
    return await this.usersService.averageRate();
  }

  @Get('me')
  @Public()
  findOne(@Headers() header) {
    const secret = process.env.JWT_SECRET;
    const { userid } = this.jwtService.verify(header.authorization, { secret });
    return this.usersService.findOne(userid);
  }
  @Get(':id')
  @Public()
  findOneID(@Param('id') id: string) {
    const secret = process.env.JWT_SECRET;

    return this.usersService.findOne(id);
  }

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imgPictureUrl'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo es demasiado grande',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|svg|webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
