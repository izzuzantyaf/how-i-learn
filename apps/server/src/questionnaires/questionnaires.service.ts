import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Questionnaire,
  QuestionnaireDocument,
} from './schemas/questionnaire.schema';

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async findAll(): Promise<Questionnaire[]> {
    return await this.questionnaireModel.find().exec();
  }
}
