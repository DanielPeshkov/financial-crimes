import { Module } from '@nestjs/common';
import { OtherReportService } from './other-report.service';
import { OtherReportController } from './other-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherReport } from './other-report';

@Module({
  imports: [TypeOrmModule.forFeature([OtherReport])],
  exports: [TypeOrmModule],
  controllers: [OtherReportController],
  providers: [OtherReportService],
})
export class OtherReportModule {}
