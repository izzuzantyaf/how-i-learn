import { IsArray, IsObject } from 'class-validator';
import { Member } from '../../../schemas/member.schema';

export class StoreAnswersMemberDto {
  @IsObject()
  member: Member;

  @IsArray()
  questionnaireAnswers: any[];
}
