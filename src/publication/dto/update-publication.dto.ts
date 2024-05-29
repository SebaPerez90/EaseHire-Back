import { PartialType } from '@nestjs/swagger';
import { CreatePublicationDto } from './create-publication.dto';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  id: number;
  title: string;
  description: string;
  imgUrl?: string;
  date: string;
  userId: string;
}
