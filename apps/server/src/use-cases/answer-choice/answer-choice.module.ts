import { Module } from '@nestjs/common';
import { AnswerChoiceService } from './answer-choice.service';
import { AnswerChoiceController } from './answer-choice.controller';

@Module({
  controllers: [AnswerChoiceController],
  providers: [AnswerChoiceService]
})
export class AnswerChoiceModule {}
