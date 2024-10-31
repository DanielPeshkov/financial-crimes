import { Controller } from '@nestjs/common';
import { LaunderingReportService } from './laundering-report.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('laundering/report')
export class LaunderingReportController {
  constructor(private readonly launderingReportService: LaunderingReportService) {}

  @MessagePattern({path: 'post/laundering/report'})
  create(report) {
      return this.launderingReportService.create(report);
  }

  @MessagePattern({path: 'get/laundering/report'})
  findAll(data: string) {
      return this.launderingReportService.findAll();    
  }

  @MessagePattern({path: 'getById/laundering/report'})
  findOne(id: number) {
      return this.launderingReportService.findOne(id);
  }

  @MessagePattern({path: 'putlaundering/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.launderingReportService.update(+id, body);
  }

  @MessagePattern({path: 'deletelaundering/report'})
  delete(id: number) {
      return this.launderingReportService.remove(id);
  }
}
