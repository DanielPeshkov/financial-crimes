import { Controller } from '@nestjs/common';
import { MortgageReportService } from './mortgage-report.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('mortgage/report')
export class MortgageReportController {
  constructor(private readonly mortgageReportService: MortgageReportService) {}

  @MessagePattern({path: 'post/mortgage/report'})
  create(report) {
      return this.mortgageReportService.create(report);
  }

  @MessagePattern({path: 'get/mortgage/report'})
  findAll(data: string) {
      return this.mortgageReportService.findAll();    
  }

  @MessagePattern({path: 'getById/mortgage/report'})
  findOne(id: number) {
      return this.mortgageReportService.findOne(id);
  }

  @MessagePattern({path: 'putmortgage/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.mortgageReportService.update(+id, body);
  }

  @MessagePattern({path: 'deletemortgage/report'})
  delete(id: number) {
      return this.mortgageReportService.remove(id);
  }
}
