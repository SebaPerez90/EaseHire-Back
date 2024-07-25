import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { Credential } from 'src/database/entities/credentials.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}
  
  async signUp(user: CreateUserDto) { 
    const userFind = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userFind) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(user.password, 10);
    if (!passwordHash) throw new BadRequestException('Invalid password');

    const newCredemtials = await this.credentialsRepository.save({
      email: user.email,
      password: passwordHash,
    });

    const createUser = await this.userRepository.save({
      name: user.name,
      email: user.email,
      credential: newCredemtials,
    });

    const { credential, ...userCreate } = createUser;
    return { massage: 'Usuario Creado', userCreate };
  }

  async signIn(email: string, password: string, res: Response) {
    const userFind = await this.userRepository.findOne({
      where: { email: email },
      relations: { credential: true },
    });
    if (!userFind) throw new BadRequestException('Credenciales incorrectas');

    const passwordHash = await bcrypt.compare(
      password,
      userFind.credential.password,
    );
    if (!passwordHash)
      throw new BadRequestException('Credenciales incorrectas');

    const playload = {
      id: userFind.id,
      email: userFind.email,
      Role: userFind.role,
    };
    const token = this.jwtService.sign(playload, {
      secret: process.env.JWT_SECRET,
    });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .send({ message: 'Sesión iniciada correctamente' });
  }
  
  async signOut(res: Response) {
    res.clearCookie('token')
    .send({ message: 'Sesión finalizada correctamente' });
  }
}
