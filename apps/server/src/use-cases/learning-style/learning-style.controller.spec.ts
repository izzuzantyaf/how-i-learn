import { Test, TestingModule } from '@nestjs/testing';
import { LearningStyleController } from './learning-style.controller';
import { LearningStyleService } from './learning-style.service';

describe('LearningStyleController', () => {
  let controller: LearningStyleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningStyleController],
      providers: [LearningStyleService],
    }).compile();

    controller = module.get<LearningStyleController>(LearningStyleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
