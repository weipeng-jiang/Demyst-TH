import { Module } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { BalanceSheetController } from './balance-sheet.controller';
import { XeroModule } from '../xero/xero.module';

@Module({
  imports: [XeroModule],
  controllers: [BalanceSheetController],
  providers: [BalanceSheetService],
})
export class BalanceSheetModule {}
