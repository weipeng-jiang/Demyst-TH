import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { BalanceSheetModule } from './balance-sheet/balance-sheet.module';
import { XeroModule } from './xero/xero.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [BalanceSheetModule],
})
export class ReportsModule {}
