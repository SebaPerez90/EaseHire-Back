import { IsNotEmpty } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  remoteWork: boolean;

  imgUrl?: string;

  user: string;
}
