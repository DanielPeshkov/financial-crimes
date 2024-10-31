import { Controller } from '@nestjs/common';
import { OtherReportService } from './other-report.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('other/report')
export class OtherReportController {
  constructor(private readonly otherReportService: OtherReportService) {}

  @MessagePattern({path: 'post/other/report'})
  create(report) {
      return this.otherReportService.create(report);
  }

  @MessagePattern({path: 'get/other/report'})
  findAll(data: string) {
      return this.otherReportService.findAll();    
  }

  @MessagePattern({path: 'getById/other/report'})
  findOne(id: number) {
      return this.otherReportService.findOne(id);
  }

  @MessagePattern({path: 'putother/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.otherReportService.update(+id, body);
  }

  @MessagePattern({path: 'deleteother/report'})
  delete(id: number) {
      return this.otherReportService.remove(id);
  }
}
