import { Controller, Get } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
@Controller('reports/balance-sheet')
export class BalanceSheetController {
  constructor(private readonly balanceSheetService: BalanceSheetService) {}

  @Get()
  getBalanceSheet() {
    return this.balanceSheetService.getBalanceSheet();
  }
}
