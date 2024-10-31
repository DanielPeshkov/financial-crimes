import { Controller } from '@nestjs/common';
import { InstitutionReportService } from './institution-report.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('institution/report')
export class InstitutionReportController {
  constructor(private readonly institutionReportService: InstitutionReportService) {}

  @MessagePattern({path: 'post/institution/report'})
  create(report) {
      return this.institutionReportService.create(report);
  }

  @MessagePattern({path: 'get/institution/report'})
  findAll(data: string) {
      return this.institutionReportService.findAll();    
  }

  @MessagePattern({path: 'getById/institution/report'})
  findOne(id: number) {
      return this.institutionReportService.findOne(id);
  }

  @MessagePattern({path: 'putinstitution/report'})
  update(payload: any) {
      let {id, body} = payload
      return this.institutionReportService.update(+id, body);
  }

  @MessagePattern({path: 'deleteinstitution/report'})
  delete(id: number) {
      return this.institutionReportService.remove(id);
  }
}
