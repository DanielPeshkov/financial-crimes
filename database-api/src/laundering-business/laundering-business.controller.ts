import { Controller } from '@nestjs/common';
import { LaunderingBusinessService } from './laundering-business.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('laundering/business')
export class LaunderingBusinessController {
  constructor(private readonly launderingBusinessService: LaunderingBusinessService) {}

  @MessagePattern({path: 'post/laundering/business'})
  create(business) {
      return this.launderingBusinessService.create(business);
  }

  @MessagePattern({path: 'get/laundering/business'})
  findAll(data: string) {
      return this.launderingBusinessService.findAll();    
  }

  @MessagePattern({path: 'getById/laundering/business'})
  findOne(id: number) {
      return this.launderingBusinessService.findOne(id);
  }

  @MessagePattern({path: 'putlaundering/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.launderingBusinessService.update(+id, body);
  }

  @MessagePattern({path: 'deletelaundering/business'})
  delete(id: number) {
      return this.launderingBusinessService.remove(id);
  }
}
