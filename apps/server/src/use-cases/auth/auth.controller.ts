import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponse } from 'src/lib/api-response';
import { AuthService } from 'src/use-cases/auth/auth.service';
import { JwtAuthGuard } from 'src/use-cases/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/use-cases/auth/guards/local-auth-guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signin(@Request() req) {
    this.logger.debug(`Request.body ${JSON.stringify(req.body, undefined, 2)}`);
    const { access_token } = await this.authService.signin(
      req.body.username,
      req.body.password,
    );
    return new SuccessfulResponse('Login berhasil', { access_token });
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(@Request() req) {
    this.logger.debug(
      `Request.headers.authorization ${JSON.stringify(
        {
          authorization: req.headers.authorization,
        },
        undefined,
        2,
      )}`,
    );
    const access_token = req.headers.authorization.split(' ')[1];
    const decodedPayload = this.authService.verifyAccessToken(access_token);
    return new SuccessfulResponse('Access token valid', decodedPayload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send-email-verification-link/:userId')
  async sendVerificationEmailLink(
    @Param('userId') userId: string,
    @Query('url') url: string,
  ) {
    const result = await this.authService.sendEmailVerificationLink(
      parseInt(userId),
      url,
    );
    return new SuccessfulResponse('Link verifikasi terkirim');
  }

  @Patch('verify-email')
  async emailVerify(@Query('token') token: string) {
    const result = await this.authService.verifyEmail(token);
    return new SuccessfulResponse('Email berhasil diverifikasi', result);
  }
}
