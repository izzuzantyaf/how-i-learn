import { IsArray, IsObject } from 'class-validator';
import { Respondent } from '../../../schemas/respondent.schema';

export class StoreAnswersDto {
  @IsObject()
  respondent: Respondent;

  @IsArray()
  questionnaireAnswers: any[];
}
