import { Controller } from '@nestjs/common';
import { InstitutionIndividualService } from './institution-individual.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('institution/individual')
export class InstitutionIndividualController {
  constructor(private readonly institutionIndividualService: InstitutionIndividualService) {}

  @MessagePattern({path: 'post/institution/individual'})
  create(individual) {
      return this.institutionIndividualService.create(individual);
  }

  @MessagePattern({path: 'get/institution/individual'})
  findAll(data: string) {
      return this.institutionIndividualService.findAll();    
  }

  @MessagePattern({path: 'getById/institution/individual'})
  findOne(id: number) {
      return this.institutionIndividualService.findOne(id);
  }

  @MessagePattern({path: 'putinstitution/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.institutionIndividualService.update(+id, body);
  }

  @MessagePattern({path: 'deleteinstitution/individual'})
  delete(id: number) {
      return this.institutionIndividualService.remove(id);
  }
}
