import { Body, Controller, Delete, Post } from '@nestjs/common';
import DeleteDto from './dto/delete.dto';
import SignInDto from './dto/signin.dto';
import SignUpDto from './dto/signup.dto';
import UpdateDto from './dto/update.dto';
import { MemberService } from './member.service';

@Controller('api')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
  async signUp(@Body() newMember: SignUpDto) {
    return await this.memberService.signUp(newMember);
  }

  @Post('signin')
  async signIn(@Body() memberCredentials: SignInDto) {
    return await this.memberService.signIn(memberCredentials);
  }

  @Post('member/update')
  async update(@Body() member: UpdateDto) {
    return await this.memberService.update(member);
  }

  @Delete('member/delete')
  async delete(@Body() member: DeleteDto) {
    return await this.memberService.deleteAccount(member);
  }
}
