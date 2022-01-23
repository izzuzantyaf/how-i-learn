import { Module } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Respondent, RespondentSchema } from '../../schemas/respondent.schema';
import { PlaygroundController } from './playground.controller';
import {
  RespondentAnswer,
  RespondentAnswerSchema,
} from '../../schemas/respondent-answer.schema';
import { Rspd, RspdSchema } from '../../schemas/rspd.schema';
import {
  LearningMethodRecommendation,
  LearningMethodRecommendationSchema,
} from '../../schemas/learningMethodRecommendation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Respondent.name, schema: RespondentSchema },
      { name: RespondentAnswer.name, schema: RespondentAnswerSchema },
      { name: Rspd.name, schema: RspdSchema },
      {
        name: LearningMethodRecommendation.name,
        schema: LearningMethodRecommendationSchema,
      },
    ]),
  ],
  providers: [PlaygroundService],
  controllers: [PlaygroundController],
})
export class PlaygroundModule {}
