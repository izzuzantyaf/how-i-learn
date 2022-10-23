import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataServiceService } from './data-service.service';
import { User, UserSchema } from '../core/entities/user.entity';
import { PrismaModule } from './prisma/prisma.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [PrismaModule],
  providers: [DataServiceService],
  exports: [DataServiceService],
})
export class DataServiceModule {}
