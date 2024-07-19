import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/is-public.decorator';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/createUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  async signIn(@Body() credentials: RegisterDto) {
    return await this.authService.signIn(credentials);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

}
