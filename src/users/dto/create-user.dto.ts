import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name?: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  lastname?: string;

  @IsNotEmpty()
  @IsNumber()
  @Length(6, 20)
  dni?: string;

  @IsNotEmpty()
  @IsString()
  country?: string;

  @IsNotEmpty()
  @IsString()
  city?: string;

  @IsNotEmpty()
  @IsString()
  birthdate?: string;

  @IsNotEmpty()
  @IsBoolean()
  availability: string;
}
