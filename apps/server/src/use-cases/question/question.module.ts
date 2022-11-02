import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { DataServiceModule } from 'src/database/data-service.module';

@Module({
  imports: [DataServiceModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
