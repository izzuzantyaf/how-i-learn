import { Test, TestingModule } from '@nestjs/testing';
import { SesModule } from './ses.module';
import { SesService } from './ses.service';

describe('SesService', () => {
  let service: SesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SesModule],
    }).compile();

    service = module.get<SesService>(SesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
