import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LearningMethodRecommendation } from './learningMethodRecommendation';

export type RespondentDocument = Respondent & Document;

@Schema()
export class Respondent {
  @Prop()
  name: string;
  @Prop()
  university: string;
  @Prop()
  major: string;
  @Prop()
  age: number;
  @Prop({ type: Object })
  learningTypes;
  @Prop()
  bestLearningType: string;
  @Prop({ type: Array })
  learningMethodRecommendations;
}

export const RespondentSchema = SchemaFactory.createForClass(Respondent);
