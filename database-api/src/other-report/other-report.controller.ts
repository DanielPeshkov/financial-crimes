import { Controller, Get, Post, Patch, Param, Delete, HttpCode, Body, Put } from '@nestjs/common';
import { OtherReportService } from './other-report.service';
import { OtherReport } from './other-report';
import { MessagePattern } from '@nestjs/microservices';

@Controller('other/report')
export class OtherReportController {
  constructor(private readonly otherReportService: OtherReportService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() otherReport: OtherReport) {
  //   return this.otherReportService.create(otherReport);
  // }

  @MessagePattern({path: 'post/other/report'})
  create(report) {
      return this.otherReportService.create(report);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.otherReportService.findAll();
  // }

  @MessagePattern({path: 'get/other/report'})
  findAll(data: string) {
      return this.otherReportService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.otherReportService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/other/report'})
  findOne(id: number) {
      return this.otherReportService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() otherReport: OtherReport) {
  //   return this.otherReportService.update(+id, otherReport);
  // }

  @MessagePattern({path: 'putother/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.otherReportService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.otherReportService.remove(+id);
  // }

  @MessagePattern({path: 'deleteother/report'})
  delete(id: number) {
      return this.otherReportService.remove(id);
  }
}
