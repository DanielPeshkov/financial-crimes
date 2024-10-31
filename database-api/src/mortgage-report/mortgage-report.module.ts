import { Module } from '@nestjs/common';
import { MortgageReportService } from './mortgage-report.service';
import { MortgageReportController } from './mortgage-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MortgageReport } from './mortgage-report';

@Module({
  imports: [TypeOrmModule.forFeature([MortgageReport])],
  exports: [TypeOrmModule],
  controllers: [MortgageReportController],
  providers: [MortgageReportService],
})
export class MortgageReportModule {}
