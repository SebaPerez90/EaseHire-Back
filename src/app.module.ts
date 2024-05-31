import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfesionsModule } from './profesions/profesions.module';
import { PublicationModule } from './publication/publication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExperienceModule } from './experience/experience.module';
import typeorm from './database/config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),

    UsersModule,
    ProfesionsModule,
    PublicationModule,
    AuthModule,
    ExperienceModule,
  ],

  controllers: [AppController],
  providers: [AppService, UsersModule],
})
export class AppModule {}
