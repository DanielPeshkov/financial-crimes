import { Controller } from '@nestjs/common';
import { MortgageBusinessService } from './mortgage-business.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('mortgage/business')
export class MortgageBusinessController {
  constructor(private readonly mortgageBusinessService: MortgageBusinessService) {}

  @MessagePattern({path: 'post/mortgage/business'})
  create(business) {
      return this.mortgageBusinessService.create(business);
  }

  @MessagePattern({path: 'get/mortgage/business'})
  findAll(data: string) {
      return this.mortgageBusinessService.findAll();    
  }

  @MessagePattern({path: 'getById/mortgage/business'})
  findOne(id: number) {
      return this.mortgageBusinessService.findOne(id);
  }

  @MessagePattern({path: 'putmortgage/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.mortgageBusinessService.update(+id, body);
  }

  @MessagePattern({path: 'deletemortgage/business'})
  delete(id: number) {
      return this.mortgageBusinessService.remove(id);
  }
}
