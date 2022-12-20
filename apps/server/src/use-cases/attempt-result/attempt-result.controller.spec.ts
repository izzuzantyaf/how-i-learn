import { Test, TestingModule } from '@nestjs/testing';
import { AttemptResultController } from './attempt-result.controller';
import { AttemptResultService } from './attempt-result.service';

describe('AttemptResultController', () => {
  let controller: AttemptResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttemptResultController],
      providers: [AttemptResultService],
    }).compile();

    controller = module.get<AttemptResultController>(AttemptResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
