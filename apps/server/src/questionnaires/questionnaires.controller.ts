import { Body, Controller, Get, Post } from '@nestjs/common';
import { StoreAnswersDto } from './dto/store-answers.dto';
import { QuestionnairesService } from './questionnaires.service';

@Controller('api/questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesServices: QuestionnairesService) {}

  @Get()
  findAll() {
    return this.questionnairesServices.findAll();
  }

  @Post('submit-answers')
  submitAnswers(@Body() storeAnswerDto: StoreAnswersDto) {
    return this.questionnairesServices.storeAnswers(storeAnswerDto);
  }
}
