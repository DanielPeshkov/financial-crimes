import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { InstitutionIndividualService } from './institution-individual.service';
import { InstitutionIndividual } from './institution-individual';
import { MessagePattern } from '@nestjs/microservices';

@Controller('institution/individual')
export class InstitutionIndividualController {
  constructor(private readonly institutionIndividualService: InstitutionIndividualService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() institutionIndividual: InstitutionIndividual) {
  //   return this.institutionIndividualService.create(institutionIndividual);
  // }

  @MessagePattern({path: 'post/institution/individual'})
  create(individual) {
      return this.institutionIndividualService.create(individual);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.institutionIndividualService.findAll();
  // }

  @MessagePattern({path: 'get/institution/individual'})
  findAll(data: string) {
      return this.institutionIndividualService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.institutionIndividualService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/institution/individual'})
  findOne(id: number) {
      return this.institutionIndividualService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() institutionIndividual: InstitutionIndividual) {
  //   return this.institutionIndividualService.update(+id, institutionIndividual);
  // }

  @MessagePattern({path: 'putinstitution/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.institutionIndividualService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.institutionIndividualService.remove(+id);
  // }

  @MessagePattern({path: 'deleteinstitution/individual'})
  delete(id: number) {
      return this.institutionIndividualService.remove(id);
  }
}
