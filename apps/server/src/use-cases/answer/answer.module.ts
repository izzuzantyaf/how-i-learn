import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { DataServiceModule } from 'src/database/data-service.module';

@Module({
  imports: [DataServiceModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
