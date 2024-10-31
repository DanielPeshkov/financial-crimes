import { Controller } from '@nestjs/common';
import { LaunderingIndividualService } from './laundering-individual.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('laundering/individual')
export class LaunderingIndividualController {
  constructor(private readonly launderingIndividualService: LaunderingIndividualService) {}

  @MessagePattern({path: 'post/laundering/individual'})
  create(individual) {
      return this.launderingIndividualService.create(individual);
  }

  @MessagePattern({path: 'get/laundering/individual'})
  findAll(data: string) {
      return this.launderingIndividualService.findAll();    
  }

  @MessagePattern({path: 'getById/laundering/individual'})
  findOne(id: number) {
      return this.launderingIndividualService.findOne(id);
  }

  @MessagePattern({path: 'putlaundering/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.launderingIndividualService.update(+id, body);
  }

  @MessagePattern({path: 'deletelaundering/individual'})
  delete(id: number) {
      return this.launderingIndividualService.remove(id);
  }
}
