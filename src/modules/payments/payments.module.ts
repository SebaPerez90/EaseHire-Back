import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicaction])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
