import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common/services';
import { ErrorResponse } from 'src/lib/api-response';
import { isJWT, isURL } from 'class-validator';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { DataServiceService } from 'src/database/data-service.service';
import { AwsService } from 'src/lib/aws/aws.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private dataService: DataServiceService,
    private awsService: AwsService,
  ) {}

  async validateUser(email: string, password: string) {
    return this.userService.checkUserCredentials(email, password);
  }

  /**
   *
   * @param email user email
   * @param password user password
   * @returns access token
   */
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

  /**
   * Verify access token
   * @param access_token access token
   * @returns decoded payload
   * @throws UnauthorizedException
   * @returns decoded payload
   */
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

  /**
   *
   * @param userId user id
   * @param url url to redirect to
   * @returns void
   */
  async sendEmailVerificationLink(userId: number, url: string) {
    this.logger.debug(
      `User id ${JSON.stringify({ userId, url }, undefined, 2)}`,
    );
    if (!isURL(url)) {
      this.logger.debug(`URL invalid ${JSON.stringify({ url }, undefined, 2)}`);
      this.logger.log(
        `Send email verification link failed ${JSON.stringify({ userId })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Link verifikasi gagal terkirim'),
      );
    }
    //* get user data
    const user = await this.dataService.user.findById(userId);
    if (!user) {
      this.logger.debug(
        `User not found ${JSON.stringify({ userId }, undefined, 2)}`,
      );
      this.logger.log(
        `Send email verification link failed ${JSON.stringify({ userId })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Link verifikasi gagal terkirim'),
      );
    }
    //* check if user has already verified email or not
    if (user.isEmailConfirmed()) {
      this.logger.debug(
        `User email is already verified ${JSON.stringify(
          { userId, email: user.email, email_confirmed: user.email_confirmed },
          undefined,
          2,
        )}`,
      );
      this.logger.log(
        `Send email verification link failed ${JSON.stringify({ userId })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Email sudah diverifikasi'),
      );
    }
    const firstName = user.name.split(' ')[0];
    const payload = { userId: user.id };
    this.logger.debug(`Payload ${JSON.stringify(payload, undefined, 2)}`);
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    this.logger.debug(
      `Email verification token ${JSON.stringify({ token }, undefined, 2)}`,
    );
    const emailVerificationLink = `${url}?token=${token}`;
    //* send email verification link to user email
    await this.awsService.ses.sendEmail({
      senderEmail: 'noreply@izzuzantyaf.space',
      senderName: 'Presisi',
      recipientEmail: user.email,
      subject: 'Verifikasi Email',
      htmlFormattedMessage: `
        <h1>Hai, ${firstName}</h1>
        <p>Silahkan klik link di bawah ini untuk memverifikasi email kamu.</p>
        <a href="${emailVerificationLink}" target="_blank" rel="noopener noreferrer" style="display:inline-block; text-decoration:none;">
          <div style="text-align:center; padding-top:12px; padding-bottom:12px; padding-left:16px; padding-right:16px; border-radius:8px; background-color:#FD7E14; color:#ffffff; font-weight:bold;">
            Verifikasi Email
          </div>
        </a>
        <br/>
        <p>Jika kamu tidak merasa membuat akun, abaikan email ini.</p>
        <p>Thank you.</p>
      `,
      textFormattedMessage: `
        Hai, ${firstName}
        Silahkan klik ${emailVerificationLink} untuk memverifikasi email kamu.
        Jika kamu tidak merasa membuat akun, abaikan email ini.
        Thank you.
      `,
    });
    this.logger.log(
      `Send email verification link success ${JSON.stringify({ userId })}`,
    );
    return;
  }

  /**
   *
   * @param token email verification token
   * @throws BadRequestException
   * @throws UnauthorizedException
   * @returns user
   */
  async verifyEmail(token: string) {
    this.logger.debug(`Token ${JSON.stringify({ token }, undefined, 2)}`);
    // check if token is valid
    if (!isJWT(token)) {
      this.logger.debug(`Token invalid`);
      this.logger.log(`Verify email failed`);
      throw new UnauthorizedException(
        new ErrorResponse('Verifikasi email gagal'),
      );
    }
    // if valid, check if user is already verified
    const decodedPayload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    this.logger.debug(
      `Decoded payload ${JSON.stringify(decodedPayload, undefined, 2)}`,
    );
    const user = await this.dataService.user.findById(decodedPayload.userId);
    if (!user) {
      this.logger.debug(
        `User not found ${JSON.stringify(
          { userId: decodedPayload.userId },
          undefined,
          2,
        )}`,
      );
      this.logger.log(`Verify email failed`);
      throw new UnauthorizedException(
        new ErrorResponse('Verifikasi email gagal'),
      );
    }
    if (user.isEmailConfirmed()) {
      this.logger.debug(
        `User email is already verified ${JSON.stringify(
          {
            userId: decodedPayload.userId,
            email: user.email,
            email_confirmed: user.email_confirmed,
          },
          undefined,
          2,
        )}`,
      );
      this.logger.log(`Verify email failed`);
      throw new BadRequestException(
        new ErrorResponse('Email sudah diverifikasi'),
      );
    }
    // if not verified, update user email_confirmed to current timestamp
    const updatedUser = await this.dataService.user.update({
      id: decodedPayload.userId,
      email_confirmed: new Date(),
    });
    this.logger.log(
      `Verify email success ${JSON.stringify({
        userId: decodedPayload.userId,
      })}`,
    );
    // return user data
    return updatedUser;
  }
}
