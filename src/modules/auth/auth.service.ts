import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { Credential } from 'src/database/entities/credentials.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}

  async signIn(credentials) {
    const userFind = await this.credentialsRepository.findOne({
      where: { email: credentials.email },
    });
    if (userFind) throw new BadRequestException('Credenciales incorrectas');

    const passwordHash = await bcrypt.compare(
      credentials.password,
      userFind.password,
    );
    if (!passwordHash)
      throw new BadRequestException('Credenciales incorrectas');

    const payload = {};
  }

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
      credentials: newCredemtials,
    });

    return { massage: 'Usuario Creado', createUser };
  }
}
