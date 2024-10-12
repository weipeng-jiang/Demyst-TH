import { Module } from '@nestjs/common';
import { XeroService } from './xero.service';
import { XeroController } from './xero.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [XeroController],
  providers: [XeroService],
  exports: [XeroService],
})
export class XeroModule {}
