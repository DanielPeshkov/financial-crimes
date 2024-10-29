import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { LaunderingIndividualService } from './laundering-individual.service';
import { LaunderingIndividual } from './laundering-individual';
import { MessagePattern } from '@nestjs/microservices';

@Controller('laundering/individual')
export class LaunderingIndividualController {
  constructor(private readonly launderingIndividualService: LaunderingIndividualService) {}

  // @Post()
  // @HttpCode(200)
  // create(@Body() launderingIndividual: LaunderingIndividual) {
  //   return this.launderingIndividualService.create(launderingIndividual);
  // }

  @MessagePattern({path: 'post/laundering/individual'})
  create(individual) {
      return this.launderingIndividualService.create(individual);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.launderingIndividualService.findAll();
  // }

  @MessagePattern({path: 'get/laundering/individual'})
  findAll(data: string) {
      return this.launderingIndividualService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.launderingIndividualService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/laundering/individual'})
  findOne(id: number) {
      return this.launderingIndividualService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() launderingIndividual: LaunderingIndividual) {
  //   return this.launderingIndividualService.update(+id, launderingIndividual);
  // }

  @MessagePattern({path: 'putlaundering/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.launderingIndividualService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(200)
  // remove(@Param('id') id: string) {
  //   return this.launderingIndividualService.remove(+id);
  // }

  @MessagePattern({path: 'deletelaundering/individual'})
  delete(id: number) {
      return this.launderingIndividualService.remove(id);
  }
}
