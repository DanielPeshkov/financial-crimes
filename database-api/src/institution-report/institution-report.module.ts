import { Module } from '@nestjs/common';
import { InstitutionReportService } from './institution-report.service';
import { InstitutionReportController } from './institution-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionReport } from './institution-report';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionReport])],
  exports: [TypeOrmModule],
  controllers: [InstitutionReportController],
  providers: [InstitutionReportService],
})
export class InstitutionReportModule {}
