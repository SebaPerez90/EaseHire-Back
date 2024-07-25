import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/is-public.decorator';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  async signIn(@Body() credentials: RegisterDto, @Res() res: Response) {
    const { email, password } = credentials;
    return await this.authService.signIn(email, password, res);
  }

  @Public()
  @Post('signUp')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Public()
  @Post('signOut')
  async signOut(@Res() res: Response) {
    return await this.authService.signOut(res);
  }


}
