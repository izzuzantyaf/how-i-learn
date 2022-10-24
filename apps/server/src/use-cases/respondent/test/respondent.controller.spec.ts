import { Test, TestingModule } from '@nestjs/testing';
import { RespondentController } from '../respondent.controller';
import { RespondentModule } from '../respondent.module';

describe('RespondentController', () => {
  let controller: RespondentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RespondentModule],
    }).compile();

    controller = module.get<RespondentController>(RespondentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
