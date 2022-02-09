import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'schemas/member.schema';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
      },
    ]),
  ],
  providers: [MemberService],
  controllers: [MemberController],
})
export class MemberModule {}
