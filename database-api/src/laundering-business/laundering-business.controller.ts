import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { LaunderingBusinessService } from './laundering-business.service';
import { LaunderingBusiness } from './laundering-business';
import { MessagePattern } from '@nestjs/microservices';

@Controller('laundering/business')
export class LaunderingBusinessController {
  constructor(private readonly launderingBusinessService: LaunderingBusinessService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() launderingBusiness: LaunderingBusiness) {
  //   return this.launderingBusinessService.create(launderingBusiness);
  // }

  @MessagePattern({path: 'post/laundering/business'})
  create(business) {
      return this.launderingBusinessService.create(business);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.launderingBusinessService.findAll();
  // }

  @MessagePattern({path: 'get/laundering/business'})
  findAll(data: string) {
      return this.launderingBusinessService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.launderingBusinessService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/laundering/business'})
  findOne(id: number) {
      return this.launderingBusinessService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() launderingBusiness: LaunderingBusiness) {
  //   return this.launderingBusinessService.update(+id, launderingBusiness);
  // }

  @MessagePattern({path: 'putlaundering/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.launderingBusinessService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.launderingBusinessService.remove(+id);
  // }

  @MessagePattern({path: 'deletelaundering/business'})
  delete(id: number) {
      return this.launderingBusinessService.remove(id);
  }
}
