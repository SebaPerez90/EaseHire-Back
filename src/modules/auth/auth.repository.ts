import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/database/entities/credentials.entity';
import { Repository } from 'typeorm';

export class AuthRepository {
  constructor(
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}

  async simulateAuthFlow({ email, password }) {
    const foundAccount = await this.credentialsRepository.findOne({
      where: { email: email },
    });

    if (foundAccount) throw new BadRequestException('user already exists');

    if (password && email) {
      const newCredential = new Credential();
      newCredential.email = email;
      newCredential.password = password;
      await this.credentialsRepository.save(newCredential);
      return newCredential;
    }
  }
}
