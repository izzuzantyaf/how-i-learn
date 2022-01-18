import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from 'schemas/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  signUp(member: Member) {
    return this.memberModel.create(member);
  }

  signIn(email: string, password: string) {
    return this.memberModel.findOne({ email, password });
  }
}
