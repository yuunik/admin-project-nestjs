import { Test, TestingModule } from '@nestjs/testing';
import { ValidateCodeService } from './validate-code.service';

describe('ValidateCodeService', () => {
  let service: ValidateCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateCodeService],
    }).compile();

    service = module.get<ValidateCodeService>(ValidateCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
