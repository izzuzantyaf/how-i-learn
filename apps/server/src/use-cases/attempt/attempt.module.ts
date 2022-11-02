import { Module } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { AttemptController } from './attempt.controller';
import { DataServiceModule } from 'src/database/data-service.module';

@Module({
  imports: [DataServiceModule],
  controllers: [AttemptController],
  providers: [AttemptService],
})
export class AttemptModule {}
