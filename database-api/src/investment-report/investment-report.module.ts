import { Module } from '@nestjs/common';
import { InvestmentReportService } from './investment-report.service';
import { InvestmentReportController } from './investment-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentReport } from './investment-report';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentReport])],
  exports: [TypeOrmModule],
  controllers: [InvestmentReportController],
  providers: [InvestmentReportService],
})
export class InvestmentReportModule {}
