import { Controller, Get, Post, Patch, Param, Delete, HttpCode, Body, Put } from '@nestjs/common';
import { OtherReportService } from './other-report.service';
import { OtherReport } from './other-report';

@Controller('other/report')
export class OtherReportController {
  constructor(private readonly otherReportService: OtherReportService) {}

  @Post()
  @HttpCode(201)
  create(@Body() otherReport: OtherReport) {
    return this.otherReportService.create(otherReport);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.otherReportService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.otherReportService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() otherReport: OtherReport) {
    return this.otherReportService.update(+id, otherReport);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.otherReportService.remove(+id);
  }
}
