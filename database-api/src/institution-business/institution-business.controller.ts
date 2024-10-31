import { Controller } from '@nestjs/common';
import { InstitutionBusinessService } from './institution-business.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('institution/business')
export class InstitutionBusinessController {
  constructor(private readonly institutionBusinessService: InstitutionBusinessService) {}

  @MessagePattern({path: 'post/institution/business'})
  create(business) {
      return this.institutionBusinessService.create(business);
  }

  @MessagePattern({path: 'get/institution/business'})
  findAll(data: string) {
      return this.institutionBusinessService.findAll();    
  }

  @MessagePattern({path: 'getById/institution/business'})
  findOne(id: number) {
      return this.institutionBusinessService.findOne(id);
  }

  @MessagePattern({path: 'putinstitution/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.institutionBusinessService.update(+id, body);
  }

  @MessagePattern({path: 'deleteinstitution/business'})
  delete(id: number) {
      return this.institutionBusinessService.remove(id);
  }
}
