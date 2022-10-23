import { IsArray, IsObject } from 'class-validator';
import { Respondent } from 'src/core/schemas/respondent.schema';

export class StoreAnswersDto {
  @IsObject()
  respondent: Respondent;

  @IsArray()
  questionnaireAnswers: any[];
}
