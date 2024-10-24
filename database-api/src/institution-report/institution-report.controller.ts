import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { InstitutionReportService } from './institution-report.service';
import { InstitutionReport } from './institution-report';

@Controller('institution/report')
export class InstitutionReportController {
  constructor(private readonly institutionReportService: InstitutionReportService) {}

  @Post()
  @HttpCode(201)
  create(@Body() institutionReport: InstitutionReport) {
    return this.institutionReportService.create(institutionReport);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.institutionReportService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.institutionReportService.findOne(+id);
  }

  @Post(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() institutionReport: InstitutionReport) {
    return this.institutionReportService.update(+id, institutionReport);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.institutionReportService.remove(+id);
  }
}
