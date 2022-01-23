import { Module } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnairesController } from './questionnaires.controller';
import {
  Questionnaire,
  QuestionnaireSchema,
} from '../../schemas/questionnaire.schema';
import { Respondent, RespondentSchema } from '../../schemas/respondent.schema';
import {
  RespondentAnswer,
  RespondentAnswerSchema,
} from '../../schemas/respondent-answer.schema';
import {
  LearningMethodRecommendation,
  LearningMethodRecommendationSchema,
} from '../../schemas/learningMethodRecommendation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
      { name: Respondent.name, schema: RespondentSchema },
      { name: RespondentAnswer.name, schema: RespondentAnswerSchema },
      {
        name: LearningMethodRecommendation.name,
        schema: LearningMethodRecommendationSchema,
      },
    ]),
  ],
  providers: [QuestionnairesService],
  controllers: [QuestionnairesController],
})
export class QuestionnairesModule {}
