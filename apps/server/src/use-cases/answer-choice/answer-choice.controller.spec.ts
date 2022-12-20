import { Test, TestingModule } from '@nestjs/testing';
import { AnswerChoiceController } from './answer-choice.controller';
import { AnswerChoiceService } from './answer-choice.service';

describe('AnswerChoiceController', () => {
  let controller: AnswerChoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerChoiceController],
      providers: [AnswerChoiceService],
    }).compile();

    controller = module.get<AnswerChoiceController>(AnswerChoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
