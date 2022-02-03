import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { MemberService } from './member.service';

@Controller('api')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
  signUp(@Body() newMember: SignUpDto) {
    return this.memberService.signUp(newMember);
  }
}
