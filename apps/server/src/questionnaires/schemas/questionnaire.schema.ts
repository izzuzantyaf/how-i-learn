import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema()
export class Questionnaire {
  @Prop()
  id: number;

  @Prop()
  question: string;

  @Prop()
  answerChoices: any[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
