import { Controller } from '@nestjs/common';
import { XeroService } from './xero.service';

@Controller('xero')
export class XeroController {
  constructor(private readonly xeroService: XeroService) {}
}
