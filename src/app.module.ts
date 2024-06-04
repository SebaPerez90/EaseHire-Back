import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProfesionsModule } from './modules/profesions/profesions.module';
import { PublicationModule } from './modules/publication/publication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ExperienceModule } from './modules/experience/experience.module';
import typeorm from './database/config/typeorm';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

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
    FeedbackModule,
    AuthModule,
    ExperienceModule,
    FeedbackModule,
    NotificationsModule,
  ],

  controllers: [AppController],
  providers: [AppService, UsersModule],
})
export class AppModule {}
