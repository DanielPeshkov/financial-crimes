import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionReportService } from './institution-report.service';

@Controller('institution/report')
export class InstitutionReportController {
  constructor(private readonly institutionReportService: InstitutionReportService) {}

  @Post()
  create() {
    return this.institutionReportService.create();
  }

  @Get()
  findAll() {
    return this.institutionReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.institutionReportService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionReportService.remove(+id);
  }
}
