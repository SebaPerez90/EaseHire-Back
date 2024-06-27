import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorators/is-public.decorator';
import { PostCategory } from './dto/post-category.dto';
// import { Request } from 'express';

@Controller('professions')
export class ProfesionsController {
  constructor(
    private readonly profesionsService: ProfesionsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @Public()
  getAllProfessions() {
    return this.profesionsService.getAllProfessions();
  }

  @Post()
  @Public()
  addProfession(@Body() professionData: PostCategory) {
    return this.profesionsService.addProfession(professionData);
  }

  // @Patch('me')
  // meProfesion(@Headers() header, @Body() body) {
  //   const secret = process.env.JWT_SECRET;
  //   const { userid } = this.jwtService.verify(header.authorization, { secret });
  //   return this.profesionsService.meProfesion(userid, body);
  // }

  // @Delete('update/:categoryName')
  // removeProfesion(
  //   @Req() req: Request,
  //   @Param('categoryName') categoryName: string,
  // ) {
  //   return this.profesionsService.removeProfesion(req, categoryName);
  // }
}
