import { Test, TestingModule } from '@nestjs/testing';
import { XeroService } from './xero.service';

describe('XeroService', () => {
  let service: XeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XeroService],
    }).compile();

    service = module.get<XeroService>(XeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
