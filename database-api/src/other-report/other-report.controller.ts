import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { OtherReportService } from './other-report.service';

@Controller('other/report')
export class OtherReportController {
  constructor(private readonly otherReportService: OtherReportService) {}

  @Post()
  create() {
    return this.otherReportService.create();
  }

  @Get()
  findAll() {
    return this.otherReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.otherReportService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherReportService.remove(+id);
  }
}
