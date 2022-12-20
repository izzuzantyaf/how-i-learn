import { Module } from '@nestjs/common';
import { AttemptResultService } from './attempt-result.service';
import { AttemptResultController } from './attempt-result.controller';

@Module({
  controllers: [AttemptResultController],
  providers: [AttemptResultService]
})
export class AttemptResultModule {}
