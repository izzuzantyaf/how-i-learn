import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Respondent,
  RespondentDocument,
} from '../../schemas/respondent.schema';
// import * as mongoose from 'mongoose';

@Injectable()
export class PlaygroundService {
  constructor(
    @InjectModel(Respondent.name)
    private respondentModel: Model<RespondentDocument>,
  ) {}

  async findAll() {
    // let respondents = await this.respondentModel.find().exec();
    // respondents = respondents.map((respondent) => {
    //   respondent.bestLearningTypesCode = respondent.bestLearningTypes
    //     .map((bestLearningType) => bestLearningType.at(0).toUpperCase())
    //     .join('');
    //   return respondent;
    // });
    return await this.respondentModel.find().exec();
  }
}
