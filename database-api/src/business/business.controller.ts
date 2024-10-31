import { Controller } from '@nestjs/common';
import { BusinessService } from './business.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @MessagePattern({path: 'post/business'})
  create(business) {
      return this.businessService.create(business);
  }

  @MessagePattern({path: 'get/business'})
  findAll(data: string) {
      return this.businessService.findAll();    
  }

  @MessagePattern({path: 'getById/business'})
  findOne(id: number) {
      return this.businessService.findOne(id);
  }

  @MessagePattern({path: 'putbusiness'})
  update(payload: any) {
      let {id, body} = payload
      return this.businessService.update(+id, body);
  }

  @MessagePattern({path: 'deletebusiness'})
  delete(id: number) {
      return this.businessService.remove(id);
  }
}
