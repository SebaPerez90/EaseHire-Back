import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PostCategory {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(35)
  category: string;
}
