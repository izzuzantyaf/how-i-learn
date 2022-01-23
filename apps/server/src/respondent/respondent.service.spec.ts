import { Test, TestingModule } from '@nestjs/testing';
import { RespondentService } from './respondent.service';

describe('RespondentService', () => {
  let service: RespondentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespondentService],
    }).compile();

    service = module.get<RespondentService>(RespondentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
