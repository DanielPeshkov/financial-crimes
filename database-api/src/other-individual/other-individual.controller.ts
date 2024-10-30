import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { OtherIndividualService } from './other-individual.service';
import { OtherIndividual } from './other-individual';
import { MessagePattern } from '@nestjs/microservices';

@Controller('other/individual')
export class OtherIndividualController {
  constructor(private readonly otherIndividualService: OtherIndividualService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() otherIndividual: OtherIndividual) {
  //   return this.otherIndividualService.create(otherIndividual);
  // }

  @MessagePattern({path: 'post/other/individual'})
  create(individual) {
      return this.otherIndividualService.create(individual);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.otherIndividualService.findAll();
  // }

  @MessagePattern({path: 'get/other/individual'})
  findAll(data: string) {
      return this.otherIndividualService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.otherIndividualService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/other/individual'})
  findOne(id: number) {
      return this.otherIndividualService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() otherIndividual: OtherIndividual) {
  //   return this.otherIndividualService.update(+id, otherIndividual);
  // }

  @MessagePattern({path: 'putother/individual'})
  update(payload: any) {
      let {id, body} = payload
      return this.otherIndividualService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.otherIndividualService.remove(+id);
  // }

  @MessagePattern({path: 'deleteother/individual'})
  delete(id: number) {
      return this.otherIndividualService.remove(id);
  }
}
