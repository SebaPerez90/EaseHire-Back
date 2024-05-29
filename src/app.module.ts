import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfesionsModule } from './profesions/profesions.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [UsersModule, ProfesionsModule, PublicationModule],
  controllers: [AppController],
  providers: [AppService, UsersModule],
})
export class AppModule {}
