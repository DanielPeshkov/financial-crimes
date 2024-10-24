import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaunderingReportService } from './laundering-report.service';

@Controller('laundering/report')
export class LaunderingReportController {
  constructor(private readonly launderingReportService: LaunderingReportService) {}

  @Post()
  create() {
    return this.launderingReportService.create();
  }

  @Get()
  findAll() {
    return this.launderingReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.launderingReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.launderingReportService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.launderingReportService.remove(+id);
  }
}
