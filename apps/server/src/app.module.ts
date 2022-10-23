import { Module } from '@nestjs/common';
import { UserModule } from './use-cases/user/user.module';
import { AuthModule } from './use-cases/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
