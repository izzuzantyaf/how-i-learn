import { Module } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnairesController } from './questionnaires.controller';
import {
  Questionnaire,
  QuestionnaireSchema,
} from './schemas/questionnaire.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Questionnaire.name, schema: QuestionnaireSchema },
    ]),
  ],
  providers: [QuestionnairesService],
  controllers: [QuestionnairesController],
})
export class QuestionnairesModule {}
