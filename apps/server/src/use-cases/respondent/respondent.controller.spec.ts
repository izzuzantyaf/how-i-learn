import { Test, TestingModule } from '@nestjs/testing';
import { RespondentController } from './respondent.controller';

describe('RespondentController', () => {
  let controller: RespondentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RespondentController],
    }).compile();

    controller = module.get<RespondentController>(RespondentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
