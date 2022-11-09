import { Module } from '@nestjs/common';
import { LearningStyleService } from './learning-style.service';
import { LearningStyleController } from './learning-style.controller';

@Module({
  controllers: [LearningStyleController],
  providers: [LearningStyleService]
})
export class LearningStyleModule {}
