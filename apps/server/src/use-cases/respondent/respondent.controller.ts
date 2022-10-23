import { Controller, Get } from '@nestjs/common';
import { RespondentService } from './respondent.service';

@Controller('api/respondents')
export class RespondentController {
  constructor(private readonly respondentService: RespondentService) {}

  @Get()
  async findAll() {
    return await this.respondentService.findAll();
  }

  @Get('validation')
  async findAllWithPoints() {
    return await this.respondentService.findAllWithPoints();
  }
}
