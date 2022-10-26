import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Logger } from '@nestjs/common/services';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return await this.userService.validateUser(email, password);
  }

  async signin(user: User) {
    delete user.password;
    const payload: Omit<User, 'password'> = user;
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
      `User signin successfully ${JSON.stringify({ userId: user.id })}`,
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
