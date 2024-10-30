import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { InstitutionBusinessService } from './institution-business.service';
import { InstitutionBusiness } from './institution-business';
import { MessagePattern } from '@nestjs/microservices';

@Controller('institution/business')
export class InstitutionBusinessController {
  constructor(private readonly institutionBusinessService: InstitutionBusinessService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() institutionBusiness: InstitutionBusiness) {
  //   return this.institutionBusinessService.create(institutionBusiness);
  // }

  @MessagePattern({path: 'post/institution/business'})
  create(business) {
      return this.institutionBusinessService.create(business);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.institutionBusinessService.findAll();
  // }

  @MessagePattern({path: 'get/institution/business'})
  findAll(data: string) {
      return this.institutionBusinessService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.institutionBusinessService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/institution/business'})
  findOne(id: number) {
      return this.institutionBusinessService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() institutionBusiness: InstitutionBusiness) {
  //   return this.institutionBusinessService.update(+id, institutionBusiness);
  // }

  @MessagePattern({path: 'putinstitution/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.institutionBusinessService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.institutionBusinessService.remove(+id);
  // }

  @MessagePattern({path: 'deleteinstitution/business'})
  delete(id: number) {
      return this.institutionBusinessService.remove(id);
  }
}
