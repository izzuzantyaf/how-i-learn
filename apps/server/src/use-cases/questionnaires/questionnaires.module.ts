import { Module } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnairesController } from './questionnaires.controller';
import {
  Questionnaire,
  QuestionnaireSchema,
} from 'src/core/schemas/questionnaire.schema';
import {
  Respondent,
  RespondentSchema,
} from 'src/core/schemas/respondent.schema';
import {
  RespondentAnswer,
  RespondentAnswerSchema,
} from 'src/core/schemas/respondent-answer.schema';
import { Member, MemberSchema } from 'src/core/schemas/member.schema';
import {
  MemberAnswer,
  MemberAnswerSchema,
} from 'src/core/schemas/member-answer.schema';
import {
  LearningMethodRecommendation,
  LearningMethodRecommendationSchema,
} from 'src/core/schemas/learningMethodRecommendation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
      { name: Respondent.name, schema: RespondentSchema },
      { name: RespondentAnswer.name, schema: RespondentAnswerSchema },
      { name: Member.name, schema: MemberSchema },
      { name: MemberAnswer.name, schema: MemberAnswerSchema },
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
