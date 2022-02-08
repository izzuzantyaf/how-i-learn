import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Member, MemberDocument } from 'schemas/member.schema';
import DeleteDto from './dto/delete.dto';
import SignInDto from './dto/signin.dto';
import SignUpDto from './dto/signup.dto';
import UpdateDto from './dto/update.dto';

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
        _id: new Types.ObjectId(),
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

  async signIn(memberCredentials: SignInDto) {
    const { email, password } = memberCredentials;
    // cek apakah email terdaftar
    const member = await this.memberModel.findOne({ email }).exec();
    console.log(member);
    if (!member) return { type: 'error', message: 'Login gagal' };
    else {
      // cek apakah password sesuai
      const isPasswordCorrect = password === member.password;
      console.log(
        isPasswordCorrect ? 'password is correct' : 'password is not correct',
      );
      if (!isPasswordCorrect) return { type: 'error', message: 'Login gagal' };
      else {
        // jika password benar, return member
        return {
          type: 'success',
          message: 'Login berhasil',
          member,
        };
      }
    }
  }

  async update(member: UpdateDto) {
    console.log(member);
    const { _id, name, password } = member;
    return await this.memberModel
      .findByIdAndUpdate(_id, { name, password }, { new: true })
      .exec()
      .then((res) => ({
        type: 'success',
        message: 'Update berhasil',
        member: res,
      }))
      .catch(() => ({
        type: 'error',
        message: 'Update gagal',
      }));
  }

  async deleteAccount(deleteDto: DeleteDto) {
    const { _id } = deleteDto;
    return await this.memberModel
      .findByIdAndDelete(_id)
      .exec()
      .then(() => ({ type: 'success', message: 'Akun berhasil dihapus' }))
      .catch(() => ({ type: 'error', message: 'Akun gagal dihapus' }));
  }
}
