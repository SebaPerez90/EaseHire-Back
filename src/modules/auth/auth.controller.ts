import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
  Esto es solo para mockear datos. Emula un flow de registro
  Desconozco el flow que va manejar "Auth0"
  Esto solo sirve para que el front pueda tener algo para trabajar
  */
  @Post('signIn')
  async signIn(@Body() credentials: any) {
    return await this.authService.signIn(credentials);
  }
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async simulateSignup(@Body() credentials: RegisterDto) {
    return await this.authService.signUp();
  }
}
