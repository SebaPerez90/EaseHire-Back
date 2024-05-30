import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
  Esto es solo para mockear datos. Emula un flow de registro
  Desconozco el flow que va manejar "Auth0"
  Esto solo sirve para que el front pueda tener algo para trabajar
  */
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async simulateSignup(@Body() credentials: RegisterDto) {
    return await this.authService.simulateSignup(credentials);
  }
}
