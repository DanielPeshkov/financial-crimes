import { Controller } from '@nestjs/common';
import { OtherBusinessService } from './other-business.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('other/business')
export class OtherBusinessController {
  constructor(private readonly otherBusinessService: OtherBusinessService) {}

  @MessagePattern({path: 'post/other/business'})
  create(business) {
      return this.otherBusinessService.create(business);
  }

  @MessagePattern({path: 'get/other/business'})
  findAll(data: string) {
      return this.otherBusinessService.findAll();    
  }

  @MessagePattern({path: 'getById/other/business'})
  findOne(id: number) {
      return this.otherBusinessService.findOne(id);
  }

  @MessagePattern({path: 'putother/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.otherBusinessService.update(+id, body);
  }

  @MessagePattern({path: 'deleteother/business'})
  delete(id: number) {
      return this.otherBusinessService.remove(id);
  }
}
