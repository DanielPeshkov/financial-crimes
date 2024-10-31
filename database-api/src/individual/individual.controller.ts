import { Controller } from '@nestjs/common';
import { IndividualService } from './individual.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('individual')
export class IndividualController {
  constructor(private readonly individualService: IndividualService) {}

  @MessagePattern({path: 'post/individual'})
  create(individual) {
      return this.individualService.create(individual);
  }

  @MessagePattern({path: 'get/individual'})
  findAll(data: string) {
      return this.individualService.findAll();    
  }

  @MessagePattern({path: 'getById/individual'})
  findOne(id: number) {
      return this.individualService.findOne(id);
  }

  @MessagePattern({path: 'putindividual'})
  update(payload: any) {
      let {id, body} = payload
      return this.individualService.update(+id, body);
  }

  @MessagePattern({path: 'deleteindividual'})
  delete(id: number) {
      return this.individualService.remove(id);
  }
}
