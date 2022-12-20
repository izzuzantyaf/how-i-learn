import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { DataServiceModule } from 'src/database/data-service.module';
import { AwsModule } from 'src/lib/aws/aws.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
    }),
    DataServiceModule,
    AwsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
