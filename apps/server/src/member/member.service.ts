import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from 'schemas/member.schema';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const isEmailExists = await this.memberModel.exists({
      email: signUpDto.email,
    });
    console.log(
      isEmailExists ? 'email is already exists' : 'email is not exists',
    );
    if (isEmailExists)
      return { type: 'error', message: 'Email sudah terdaftar' };
    else {
      const storedMember = await this.memberModel.create({
        name: signUpDto.name,
        email: signUpDto.email,
        password: signUpDto.password,
      });
      return {
        type: 'success',
        message: 'Selamat kamu telah terdaftar',
        storedMember,
      };
    }
  }

  signIn(email: string, password: string) {
    return this.memberModel.findOne({ email, password });
  }
}
