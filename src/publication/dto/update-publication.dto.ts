import { PartialType } from '@nestjs/swagger';
import { CreatePublicationDto } from './create-publication.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  @IsNotEmpty()
  id: number;

  title?: string;

  description?: string;

  imgUrl?: string;

  date?: string;
  userId?: string;
}
