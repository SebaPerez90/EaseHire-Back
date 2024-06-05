import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostExperienceDto {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsOptional()
  company: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  title: string;

  @IsString()
  @MinLength(100)
  @MaxLength(2000)
  description: string;

  @IsString()
  @MinLength(9)
  @IsOptional()
  startDate: string;

  @IsString()
  @MinLength(9)
  @IsOptional()
  endDate: string;
}
