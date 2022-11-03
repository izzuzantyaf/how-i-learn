import { Module } from '@nestjs/common';
import { DataServiceService } from './data-service.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DataServiceService],
  exports: [DataServiceService],
})
export class DataServiceModule {}
