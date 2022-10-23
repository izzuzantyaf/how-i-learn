import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema()
export class Questionnaire {
  @Prop({ type: MongoSchema.Types.ObjectId })
  _id;

  @Prop()
  code: string;

  @Prop()
  question: string;

  @Prop()
  answerChoices: any[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
