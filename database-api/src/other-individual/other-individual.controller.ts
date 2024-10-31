import { Controller } from '@nestjs/common';
import { OtherIndividualService } from './other-individual.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('other/individual')
export class OtherIndividualController {
  constructor(private readonly otherIndividualService: OtherIndividualService) {}

  @MessagePattern({path: 'post/other/individual'})
  create(individual) {
      return this.otherIndividualService.create(individual);
  }

  @MessagePattern({path: 'get/other/individual'})
  findAll(data: string) {
      return this.otherIndividualService.findAll();    
  }

  @MessagePattern({path: 'getById/other/individual'})
  findOne(id: number) {
      return this.otherIndividualService.findOne(id);
  }

  @MessagePattern({path: 'putother/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.otherIndividualService.update(+id, body);
  }

  @MessagePattern({path: 'deleteother/individual'})
  delete(id: number) {
      return this.otherIndividualService.remove(id);
  }
}
