import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnairesController } from '../questionnaires.controller';
import { QuestionnairesModule } from '../questionnaires.module';

describe('QuestionnairesController', () => {
  let controller: QuestionnairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [QuestionnairesModule],
    }).compile();

    controller = module.get<QuestionnairesController>(QuestionnairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
