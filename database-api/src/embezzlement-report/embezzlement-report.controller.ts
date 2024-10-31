import { Controller } from '@nestjs/common';
import { EmbezzlementReportService } from './embezzlement-report.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('embezzlement/report')
export class EmbezzlementReportController {
  constructor(private readonly embezzlementReportService: EmbezzlementReportService) {}

  @MessagePattern({path: 'post/embezzlement/report'})
  create(report) {
      return this.embezzlementReportService.create(report);
  }

  @MessagePattern({path: 'get/embezzlement/report'})
  findAll(data: string) {
      return this.embezzlementReportService.findAll();    
  }

  @MessagePattern({path: 'getById/embezzlement/report'})
  findOne(id: number) {
      return this.embezzlementReportService.findOne(id);
  }

  @MessagePattern({path: 'putembezzlement/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.embezzlementReportService.update(+id, body);
  }

  @MessagePattern({path: 'deleteembezzlement/report'})
  delete(id: number) {
      return this.embezzlementReportService.remove(id);
  }
}
