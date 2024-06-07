import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/database/entities/credentials.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(credentials) {
    try {
      const { email, given_name, name, family_name, picture, email_verified } =
        credentials;

      let user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) {
        user = await this.userRepository.create({
          id: uuidv4(),
          name: name ? name : null,
          lastName: family_name ? family_name : null,
          email: email,
          email_verified: email_verified ? email_verified : null,
          imgPictureUrl: picture ? picture : null,
        });
        this.userRepository.save(user);
      }
      const userid = user.id;

      const playload = { userid, email };
      const token = this.jwtService.sign(playload, {
        secret: process.env.JWT_SECRET,
      });
      console.log(token);

      return {
        message: 'User login',
        token,
      };
    } catch (error) {
      console.error('Error en signIn:', error);
      throw new BadRequestException('failed to login');
    }
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
