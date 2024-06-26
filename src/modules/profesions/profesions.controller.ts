import { Controller, Get, Param, Delete, Req } from '@nestjs/common';
import { ProfesionsService } from './profesions.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorators/is-public.decorator';
import { Request } from 'express';

@Controller('profesions')
export class ProfesionsController {
  constructor(
    private readonly profesionsService: ProfesionsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @Public()
  findProfesions() {
    return this.profesionsService.findProfesions();
  }

  // @Patch('me')
  // meProfesion(@Headers() header, @Body() body) {
  //   const secret = process.env.JWT_SECRET;
  //   const { userid } = this.jwtService.verify(header.authorization, { secret });
  //   return this.profesionsService.meProfesion(userid, body);
  // }

  @Delete('update/:categoryName')
  removeProfesion(
    @Req() req: Request,
    @Param('categoryName') categoryName: string,
  ) {
    return this.profesionsService.removeProfesion(req, categoryName);
  }
}
