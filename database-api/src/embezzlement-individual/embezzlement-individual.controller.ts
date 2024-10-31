import { Controller } from '@nestjs/common';
import { EmbezzlementIndividualService } from './embezzlement-individual.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('embezzlement/individual')
export class EmbezzlementIndividualController {
  constructor(private readonly embezzlementIndividualService: EmbezzlementIndividualService) {}

  @MessagePattern({path: 'post/embezzlement/individual'})
  create(individual) {
      return this.embezzlementIndividualService.create(individual);
  }

  @MessagePattern({path: 'get/embezzlement/individual'})
  findAll(data: string) {
      return this.embezzlementIndividualService.findAll();    
  }

  @MessagePattern({path: 'getById/embezzlement/individual'})
  findOne(id: number) {
      return this.embezzlementIndividualService.findOne(id);
  }

  @MessagePattern({path: 'putembezzlement/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.embezzlementIndividualService.update(+id, body);
  }

  @MessagePattern({path: 'deleteembezzlement/individual'})
  delete(id: number) {
      return this.embezzlementIndividualService.remove(id);
  }
}
