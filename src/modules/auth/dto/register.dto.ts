import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  name: string;
  lastName: string;
  country: string;
  dni: number;
  city: string;
  birthdate: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
/*
name: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;
  @Column({ type: 'int', unique: true })
  dni: number;
  @Column({ type: 'varchar', length: 50 })
  country: string;
  @Column({ type: 'varchar', length: 30 })
  city: string;
  @Column({ type: 'varchar', length: 30 })
  birthdate: string;
*/
