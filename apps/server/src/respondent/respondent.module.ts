import { Module } from '@nestjs/common';
import { RespondentService } from './respondent.service';
import { RespondentController } from './respondent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Respondent, RespondentSchema } from 'schemas/respondent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Respondent.name, schema: RespondentSchema },
    ]),
  ],
  providers: [RespondentService],
  controllers: [RespondentController],
})
export class RespondentModule {}
