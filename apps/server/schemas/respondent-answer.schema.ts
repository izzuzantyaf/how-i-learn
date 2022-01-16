import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RespondentAnswerDocument = RespondentAnswer & Document;

@Schema()
export class RespondentAnswer {
  @Prop()
  respondent_id: string;

  @Prop()
  questionnaireAnswers: any[];
}

export const RespondentAnswerSchema =
  SchemaFactory.createForClass(RespondentAnswer);
