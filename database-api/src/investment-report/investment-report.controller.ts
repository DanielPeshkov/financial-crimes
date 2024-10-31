import { Controller } from '@nestjs/common';
import { InvestmentReportService } from './investment-report.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('investment/report')
export class InvestmentReportController {
  constructor(private readonly investmentReportService: InvestmentReportService) {}

  @MessagePattern({path: 'post/investment/report'})
  create(report) {
      return this.investmentReportService.create(report);
  }

  @MessagePattern({path: 'get/investment/report'})
  findAll(data: string) {
      return this.investmentReportService.findAll();    
  }

  @MessagePattern({path: 'getById/investment/report'})
  findOne(id: number) {
      return this.investmentReportService.findOne(id);
  }

  @MessagePattern({path: 'putinvestment/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.investmentReportService.update(+id, body);
  }

  @MessagePattern({path: 'deleteinvestment/report'})
  delete(id: number) {
      return this.investmentReportService.remove(id);
  }
}
