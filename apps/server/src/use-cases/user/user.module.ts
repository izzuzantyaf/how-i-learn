import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataServiceModule } from 'src/database/data-service.module';
import { UserFactoryService } from './user-factory.service';

@Module({
  imports: [DataServiceModule],
  controllers: [UserController],
  providers: [UserService, UserFactoryService],
  exports: [UserService, UserFactoryService],
})
export class UserModule {}
