import { Controller, Get } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { Questionnaire } from './schemas/questionnaire.schema';

@Controller('api/questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesServices: QuestionnairesService) {}

  @Get()
  async findAll(): Promise<Questionnaire[]> {
    return await this.questionnairesServices.findAll();
  }
}
