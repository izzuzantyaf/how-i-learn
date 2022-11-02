import { Test, TestingModule } from '@nestjs/testing';
import { AttemptController } from './attempt.controller';
import { AttemptModule } from './attempt.module';
import { AttemptService } from './attempt.service';

describe('AttemptController', () => {
  let controller: AttemptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AttemptModule],
    }).compile();

    controller = module.get<AttemptController>(AttemptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
