import { Test, TestingModule } from '@nestjs/testing';
import { XeroController } from './xero.controller';
import { XeroService } from './xero.service';

describe('XeroController', () => {
  let controller: XeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XeroController],
      providers: [XeroService],
    }).compile();

    controller = module.get<XeroController>(XeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
