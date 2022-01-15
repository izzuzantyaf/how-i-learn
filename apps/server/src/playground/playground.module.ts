import { Module } from '@nestjs/common';
import { PlaygroundService } from './playground.service';

@Module({
  providers: [PlaygroundService]
})
export class PlaygroundModule {}
