import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Respondent } from './respondent.schema';

export type RespondentAnswerDocument = RespondentAnswer & Document;

@Schema()
export class RespondentAnswer {
  @Prop({ type: MongoSchema.Types.ObjectId })
  _id;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Respondent' })
  respondent: Respondent;

  @Prop()
  questionnaireAnswers: any[];
}

export const RespondentAnswerSchema =
  SchemaFactory.createForClass(RespondentAnswer);
