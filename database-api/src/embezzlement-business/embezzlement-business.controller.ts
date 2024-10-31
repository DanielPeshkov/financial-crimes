import { Controller } from '@nestjs/common';
import { EmbezzlementBusinessService } from './embezzlement-business.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('embezzlement/business')
export class EmbezzlementBusinessController {
  constructor(private readonly embezzlementBusinessService: EmbezzlementBusinessService) {}

  @MessagePattern({path: 'post/embezzlement/business'})
  create(business) {
      return this.embezzlementBusinessService.create(business);
  }

  @MessagePattern({path: 'get/embezzlement/business'})
  findAll(data: string) {
      return this.embezzlementBusinessService.findAll();    
  }

  @MessagePattern({path: 'getById/embezzlement/business'})
  findOne(id: number) {
      return this.embezzlementBusinessService.findOne(id);
  }

  @MessagePattern({path: 'putembezzlement/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.embezzlementBusinessService.update(+id, body);
  }

  @MessagePattern({path: 'deleteembezzlement/business'})
  delete(id: number) {
      return this.embezzlementBusinessService.remove(id);
  }
}
