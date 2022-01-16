import { Controller, Get } from '@nestjs/common';
import { PlaygroundService } from './playground.service';

@Controller('api/playground')
export class PlaygroundController {
  constructor(private readonly playgroundService: PlaygroundService) {}

  @Get('respondents')
  findAll() {
    return this.playgroundService.findAll();
  }
}
