import { Injectable } from '@nestjs/common';
import { XeroService } from '../xero/xero.service';

@Injectable()
export class BalanceSheetService {
  constructor(private readonly xeroService: XeroService) {}
  getBalanceSheet() {
    return this.xeroService.getBalanceSheet();
  }
}
