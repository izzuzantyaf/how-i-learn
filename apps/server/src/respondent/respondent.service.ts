import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Respondent,
  RespondentDocument,
} from '../../schemas/respondent.schema';

@Injectable()
export class RespondentService {
  constructor(
    @InjectModel(Respondent.name)
    private respondentModel: Model<RespondentDocument>,
  ) {}

  async findAll(): Promise<Respondent[]> {
    return this.respondentModel.find().exec();
  }
}
