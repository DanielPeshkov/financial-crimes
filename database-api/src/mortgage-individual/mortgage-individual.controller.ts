import { Controller } from '@nestjs/common';
import { MortgageIndividualService } from './mortgage-individual.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('mortgage/individual')
export class MortgageIndividualController {
  constructor(private readonly mortgageIndividualService: MortgageIndividualService) {}

  @MessagePattern({path: 'post/mortgage/individual'})
  create(individual) {
      return this.mortgageIndividualService.create(individual);
  }

  @MessagePattern({path: 'get/mortgage/individual'})
  findAll(data: string) {
      return this.mortgageIndividualService.findAll();    
  }

  @MessagePattern({path: 'getById/mortgage/individual'})
  findOne(id: number) {
      return this.mortgageIndividualService.findOne(id);
  }

  @MessagePattern({path: 'putmortgage/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.mortgageIndividualService.update(+id, body);
  }

  @MessagePattern({path: 'deletemortgage/individual'})
  delete(id: number) {
      return this.mortgageIndividualService.remove(id);
  }
}
