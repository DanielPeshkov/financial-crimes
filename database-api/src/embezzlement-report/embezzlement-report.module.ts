import { Module } from '@nestjs/common';
import { EmbezzlementReportService } from './embezzlement-report.service';
import { EmbezzlementReportController } from './embezzlement-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbezzlementReport } from './embezzlement-report';

@Module({
  imports: [TypeOrmModule.forFeature([EmbezzlementReport])],
  exports: [TypeOrmModule],
  controllers: [EmbezzlementReportController],
  providers: [EmbezzlementReportService],
})
export class EmbezzlementReportModule {}
