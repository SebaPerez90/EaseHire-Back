import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { Credential } from 'src/database/entities/credentials.entity';
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

  async register(userData) {
    // const checkUser: User[] = await this.userRepository.find({
    //   where: { email: userData.email },
    // });
    // if (checkUser.length) throw new NotFoundException('user already exist');
    // const newUser = this.userRepository.create(userData);
    // // const { password, email } = newUser;
    // if (!password || !email)
    //   throw new BadRequestException('valid email and password are required');
    // const hashedPassword = await bcrypt.hash(password, 10);
    // newUser.password = hashedPassword;
    // await this.userRepository.save(newUser);
    // const user: UserWithoutPassword = await this.userService.getUser(
    //   newUser.id,
    // );
    // const { orders, ...userFiltered } = user;
    // return userFiltered;
  }
  //!!----------------------------------------------
  // retunSingIn(user: any) {
  //   console.log('estamos en el retun sing in');
  //   const userid = user.id;
  //   const role = user.role[0];
  //   const email = user.email;

  //   const playload = { userid, email, role: user.role };
  //   const token = this.jwtService.sign(playload, {
  //     secret: process.env.JWT_SECRET,
  //   });
  //   return {
  //     message: 'User login',
  //     token,
  //     role,
  //   };
  // }

  //!!----------------------------------------------
  // async signIn(credentials) {
  //   try {
  //     const { email, name, family_name, picture, email_verified } = credentials;
  //     let user = await this.userRepository.findOne({
  //       where: { email: email },
  //       relations: { credential: true },
  //     });

  //     if (user.isBlocked === true)
  //       return { message: 'Your account has been blocked' };

  //     if (!user) {
  //       const passwordTest = 'Asd_*1234';
  //       const newCredential = new Credential();
  //       newCredential.email = email;
  //       newCredential.password = passwordTest;
  //       const credentialTest =
  //         await this.credentialsRepository.save(newCredential);

  //       user = await this.userRepository.create({
  //         id: uuidv4(),
  //         name: name ? name : null,
  //         lastName: family_name ? family_name : null,
  //         email: email,
  //         email_verified: email_verified ? email_verified : null,
  //         imgPictureUrl: picture ? picture : null,
  //         datecreateUser: moment().format('YYYY-MM-DD HH:mm:ss'),
  //         role: [Role.USER],
  //         credential: credentialTest,
  //       });
  //       this.userRepository.save(user);
  //       return this.retunSingIn(user);
  //     } else if (!credentials.password) {
  //       return this.retunSingIn(user);
  //     } else {
  //       if (credentials.password !== user.credential.password)
  //         throw new BadRequestException('Credenciales incorrectas');
  //       return this.retunSingIn(user);
  //     }
  //   } catch (error) {
  //     console.error('Error en signIn:', error);
  //     throw new BadRequestException('failed to login');
  //   }
  // }
}
