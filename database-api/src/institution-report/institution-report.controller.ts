import { Controller, Get, Post, Body, Param, Delete, HttpCode } from '@nestjs/common';
import { InstitutionReportService } from './institution-report.service';
import { InstitutionReport } from './institution-report';
import { MessagePattern } from '@nestjs/microservices';

@Controller('institution/report')
export class InstitutionReportController {
  constructor(private readonly institutionReportService: InstitutionReportService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() institutionReport: InstitutionReport) {
  //   return this.institutionReportService.create(institutionReport);
  // }

  @MessagePattern({path: 'post/institution/report'})
  create(report) {
      return this.institutionReportService.create(report);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.institutionReportService.findAll();
  // }

  @MessagePattern({path: 'get/institution/report'})
  findAll(data: string) {
      return this.institutionReportService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.institutionReportService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/institution/report'})
  findOne(id: number) {
      return this.institutionReportService.findOne(id);
  }

  // @Post(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() institutionReport: InstitutionReport) {
  //   return this.institutionReportService.update(+id, institutionReport);
  // }

  @MessagePattern({path: 'putinstitution/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.institutionReportService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.institutionReportService.remove(+id);
  // }

  @MessagePattern({path: 'deleteinstitution/report'})
  delete(id: number) {
      return this.institutionReportService.remove(id);
  }
}
