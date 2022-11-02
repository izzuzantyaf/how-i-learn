import { Test, TestingModule } from '@nestjs/testing';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { Question } from './entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionModule } from './question.module';
import { QuestionService } from './question.service';

describe('QuestionController', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [QuestionModule],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it(`should return object instance of ${SuccessfulResponse.name} and list of the questions`, async () => {
      const response = await controller.findAll();
      const questions = response.data as Question[];
      expect(response).toBeInstanceOf(SuccessfulResponse);
      expect(
        questions.every((question) => question instanceof Question),
      ).toBeTruthy();
    });
  });
});
