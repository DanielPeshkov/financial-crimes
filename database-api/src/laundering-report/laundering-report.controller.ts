import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { LaunderingReportService } from './laundering-report.service';
import { LaunderingReport } from './laundering-report';

@Controller('laundering/report')
export class LaunderingReportController {
  constructor(private readonly launderingReportService: LaunderingReportService) {}

  @Post()
  @HttpCode(201)
  create(@Body() launderingReport: LaunderingReport) {
    return this.launderingReportService.create(launderingReport);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.launderingReportService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.launderingReportService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() launderingReport: LaunderingReport) {
    return this.launderingReportService.update(+id, launderingReport);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.launderingReportService.remove(+id);
  }
}
