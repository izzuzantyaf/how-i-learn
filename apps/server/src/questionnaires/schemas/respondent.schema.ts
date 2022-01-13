import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const RespondentSchema = SchemaFactory.createForClass(Respondent);
