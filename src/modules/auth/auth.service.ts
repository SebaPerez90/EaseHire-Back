import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/database/entities/credentials.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: any) {
    console.log(`entramos en signIn`);
    
    const { user_id, email, password } = await credentials;
    const user = await this.credentialRepository.findOne({
      where: { email: credentials.email },
    });
    if (user) throw new BadRequestException('Credentials incorrect');
    console.log(process.env.JWT_SECRET);
    
    const playload = { user_id, email, password };
    const token = this.jwtService.sign(playload,{secret: process.env.JWT_SECRET});
    console.log(`el token generado es : ${token}`);

    return token;
  }
  signUp(credential: RegisterDto) {
    try {
      const { email } = credential;

      // return this.authRepsoitory.signUp(credential)
    } catch (error) {
      throw new Error(error);
    }
  }
}
