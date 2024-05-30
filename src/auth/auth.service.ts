import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private credentialsRepository: AuthRepository) {}

  async simulateSignup(credentials: RegisterDto) {
    return await this.credentialsRepository.simulateAuthFlow(credentials);
  }
}
