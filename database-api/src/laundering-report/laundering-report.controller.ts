import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { LaunderingReportService } from './laundering-report.service';
import { LaunderingReport } from './laundering-report';
import { MessagePattern } from '@nestjs/microservices';

@Controller('laundering/report')
export class LaunderingReportController {
  constructor(private readonly launderingReportService: LaunderingReportService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() launderingReport: LaunderingReport) {
  //   return this.launderingReportService.create(launderingReport);
  // }

  @MessagePattern({path: 'post/laundering/report'})
  create(report) {
      return this.launderingReportService.create(report);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.launderingReportService.findAll();
  // }

  @MessagePattern({path: 'get/laundering/report'})
  findAll(data: string) {
      return this.launderingReportService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.launderingReportService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/laundering/report'})
  findOne(id: number) {
      return this.launderingReportService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() launderingReport: LaunderingReport) {
  //   return this.launderingReportService.update(+id, launderingReport);
  // }

  @MessagePattern({path: 'putlaundering/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.launderingReportService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.launderingReportService.remove(+id);
  // }

  @MessagePattern({path: 'deletelaundering/report'})
  delete(id: number) {
      return this.launderingReportService.remove(id);
  }
}
