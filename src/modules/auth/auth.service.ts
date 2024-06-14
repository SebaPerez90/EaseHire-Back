import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { Role } from 'src/enum/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(credentials) {
    try {
      const { email, name, family_name, picture, email_verified } = credentials;

      let user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) {
        user = await this.userRepository.create({
          id: uuidv4(),
          name: name ? name : null,
          lastName: family_name ? family_name : null,
          email: email,
          email_verified: email_verified ? email_verified : null,
          imgPictureUrl: picture ? picture : null,
          datecreateUser: moment().format('DD/MM/YYYY HH:mm:ss'),
          role: [Role.USER],
        });
        this.userRepository.save(user);
      }
      const userid = user.id;
     
      
      const playload = { userid, email, role:user.role };
      const token = this.jwtService.sign(playload, {
        secret: process.env.JWT_SECRET,
      });

      return {
        message: 'User login',
        token,
      };
    } catch (error) {
      console.error('Error en signIn:', error);
      throw new BadRequestException('failed to login');
    }
  }
  signUp() {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }
}
