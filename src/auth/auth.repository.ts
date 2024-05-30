import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from 'src/database/entities/credentials.entity';
import { Repository } from 'typeorm';

export class AuthRepository {
  constructor(
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}
}
