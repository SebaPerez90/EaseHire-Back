import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/is-public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @Post('signIn')
  // async signIn(@Body() credentials: any) {
  //   return await this.authService.signIn(credentials);
  // }
}
