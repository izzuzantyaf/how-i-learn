import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { PlaygroundModule } from './playground/playground.module';
import { MemberModule } from './member/member.module';
import { RespondentModule } from './respondent/respondent.module';

@Module({
  // setiap module yang dibuat wajib didaftarkan ke dalam imports agar bisa digunakan
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // MongooseModule dipakai untuk interaksi ke database
    MongooseModule.forRoot(process.env.MONGO_URI),
    QuestionnairesModule,
    PlaygroundModule,
    MemberModule,
    RespondentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
