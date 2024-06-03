import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;

  name?: string;
  lastname?: string;
  dni?: number;
  country?: string;
  city?: string;
  birthdate?: string;
  availability?: boolean;
}