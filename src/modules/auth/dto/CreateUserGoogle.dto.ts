import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserGoogleDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  email_verified: string;

  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsString()
  @IsNotEmpty()
  given_name: string;

  @IsString()
  @IsNotEmpty()
  family_name: string;
}
