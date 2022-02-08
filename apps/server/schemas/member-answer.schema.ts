import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Member } from './member.schema';

export type MemberAnswerDocument = MemberAnswer & Document;

@Schema()
export class MemberAnswer {
  // @Prop({ type: MongoSchema.Types.ObjectId })
  // _id;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Member' })
  member: Member;

  @Prop()
  questionnaireAnswers: any[];
}

export const MemberAnswerSchema = SchemaFactory.createForClass(MemberAnswer);
