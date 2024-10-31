import { Controller } from '@nestjs/common';
import { InvestmentBusinessService } from './investment-business.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('investment/business')
export class InvestmentBusinessController {
  constructor(private readonly investmentBusinessService: InvestmentBusinessService) {}

  @MessagePattern({path: 'post/investment/business'})
  create(business) {
      return this.investmentBusinessService.create(business);
  }

  @MessagePattern({path: 'get/investment/business'})
  findAll(data: string) {
      return this.investmentBusinessService.findAll();    
  }

  @MessagePattern({path: 'getById/investment/business'})
  findOne(id: number) {
      return this.investmentBusinessService.findOne(id);
  }

  @MessagePattern({path: 'putinvestment/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.investmentBusinessService.update(+id, body);
  }

  @MessagePattern({path: 'deleteinvestment/business'})
  delete(id: number) {
      return this.investmentBusinessService.remove(id);
  }
}
