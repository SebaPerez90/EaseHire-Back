import { PartialType } from '@nestjs/swagger';
import { CreatePublicationDto } from './create-publication.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  id: string;
  @IsNotEmpty()
  title?: string;
  @IsNotEmpty()
  location?: string;
  @IsNotEmpty()
  remoteWork?: boolean;
  @IsNotEmpty()
  description?: string;
  @IsNotEmpty()
  category?: string;
  @IsNotEmpty()
  imgUrl?: string;

}
