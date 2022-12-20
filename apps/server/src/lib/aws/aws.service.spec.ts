import { Test, TestingModule } from '@nestjs/testing';
import { AwsModule } from './aws.module';
import { AwsService } from './aws.service';

describe('AwsService', () => {
  let service: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AwsModule],
    }).compile();

    service = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
