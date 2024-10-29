import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { IndividualService } from './individual.service';
import { Individual } from './individual';
import { MessagePattern } from '@nestjs/microservices';

@Controller('individual')
export class IndividualController {
  constructor(private readonly individualService: IndividualService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() individual: Individual) {
  //   return this.individualService.create(individual);
  // }

  @MessagePattern({path: 'post/individual'})
  create(individual) {
      return this.individualService.create(individual);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.individualService.findAll();
  // }

  @MessagePattern({path: 'get/individual'})
  findAll(data: string) {
      return this.individualService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.individualService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/individual'})
  findOne(id: number) {
      return this.individualService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() individual: Individual) {
  //   return this.individualService.update(+id, individual);
  // }

  @MessagePattern({path: 'putindividual'})
  update(payload: any) {
      let {id, body} = payload
      return this.individualService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.individualService.remove(+id);
  // }

  @MessagePattern({path: 'deleteindividual'})
  delete(id: number) {
      return this.individualService.remove(id);
  }
}
