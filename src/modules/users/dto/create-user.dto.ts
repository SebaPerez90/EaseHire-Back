import {
  IsBoolean,
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

  /*solo acepta numberos has 19 digitos
   */
  @IsNotEmpty()
  @IsNumber()
  @Length(6, 20)
  dni?: number;

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
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsBoolean()
  availability: boolean;
}
