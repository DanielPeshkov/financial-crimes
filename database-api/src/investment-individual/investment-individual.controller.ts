import { Controller } from '@nestjs/common';
import { InvestmentIndividualService } from './investment-individual.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('investment/individual')
export class InvestmentIndividualController {
  constructor(private readonly investmentIndividualService: InvestmentIndividualService) {}

  @MessagePattern({path: 'post/investment/individual'})
  create(individual) {
      return this.investmentIndividualService.create(individual);
  }

  @MessagePattern({path: 'get/investment/individual'})
  findAll(data: string) {
      return this.investmentIndividualService.findAll();    
  }

  @MessagePattern({path: 'getById/investment/individual'})
  findOne(id: number) {
      return this.investmentIndividualService.findOne(id);
  }

  @MessagePattern({path: 'putinvestment/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.investmentIndividualService.update(+id, body);
  }

  @MessagePattern({path: 'deleteinvestment/individual'})
  delete(id: number) {
      return this.investmentIndividualService.remove(id);
  }
}
