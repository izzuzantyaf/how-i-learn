import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common/services';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { isJWT } from 'class-validator';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return this.userService.checkUserCredentials(email, password);
  }

  async signin(email: string, password: string) {
    const validatedUser = await this.validateUser(email, password);
    delete validatedUser.password;
    const payload: Omit<User, 'password'> = validatedUser;
    this.logger.debug(`Payload ${JSON.stringify(payload, undefined, 2)}`);
    const access_token = this.jwtService.sign(
      { ...payload },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    this.logger.debug(
      `Access token ${JSON.stringify({ access_token }, undefined, 2)}`,
    );
    this.logger.log(
      `User signin success ${JSON.stringify({ userId: validatedUser.id })}`,
    );
    return {
      access_token,
    };
  }

  verifyAccessToken(accessToken: string) {
    this.logger.debug(
      `Access token ${JSON.stringify(
        { access_token: accessToken },
        undefined,
        2,
      )}`,
    );
    if (!isJWT(accessToken)) {
      throw new UnauthorizedException(new ErrorResponse('Token tidak valid'));
    }
    const decodedPayload = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_SECRET,
    });
    this.logger.debug(
      `Decoded payload ${JSON.stringify(decodedPayload, undefined, 2)}`,
    );
    this.logger.log(
      `Access token is valid ${JSON.stringify({ userId: decodedPayload.id })}`,
    );
    return decodedPayload;
  }
}
