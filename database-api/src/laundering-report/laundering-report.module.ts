import { Module } from '@nestjs/common';
import { LaunderingReportService } from './laundering-report.service';
import { LaunderingReportController } from './laundering-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunderingReport } from './laundering-report';

@Module({
  imports: [TypeOrmModule.forFeature([LaunderingReport])],
  exports: [TypeOrmModule],
  controllers: [LaunderingReportController],
  providers: [LaunderingReportService],
})
export class LaunderingReportModule {}
