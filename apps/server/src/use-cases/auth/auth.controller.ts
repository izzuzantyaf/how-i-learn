import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
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
    this.logger.debug(
      `Request.user ${JSON.stringify({ user: req.user }, undefined, 2)}`,
    );
    const { access_token } = await this.authService.signin(req.user);
    return new SuccessfulResponse('Login berhasil', { access_token });
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async profile(@Request() req) {
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
}
