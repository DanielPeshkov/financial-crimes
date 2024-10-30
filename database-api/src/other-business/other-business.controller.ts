import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { OtherBusinessService } from './other-business.service';
import { OtherBusiness } from './other-business';
import { MessagePattern } from '@nestjs/microservices';

@Controller('other/business')
export class OtherBusinessController {
  constructor(private readonly otherBusinessService: OtherBusinessService) {}

  // @Post()
  // @HttpCode(201)
  // create(@Body() otherBusiness: OtherBusiness) {
  //   return this.otherBusinessService.create(otherBusiness);
  // }

  @MessagePattern({path: 'post/other/business'})
  create(business) {
      return this.otherBusinessService.create(business);
  }

  // @Get()
  // @HttpCode(200)
  // findAll() {
  //   return this.otherBusinessService.findAll();
  // }

  @MessagePattern({path: 'get/other/business'})
  findAll(data: string) {
      return this.otherBusinessService.findAll();    
  }

  // @Get(':id')
  // @HttpCode(200)
  // findOne(@Param('id') id: string) {
  //   return this.otherBusinessService.findOne(+id);
  // }

  @MessagePattern({path: 'getById/other/business'})
  findOne(id: number) {
      return this.otherBusinessService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(@Param('id') id: string, @Body() otherBusiness: OtherBusiness) {
  //   return this.otherBusinessService.update(+id, otherBusiness);
  // }

  @MessagePattern({path: 'putother/business'})
  update(payload: any) {
      let {id, body} = payload
      return this.otherBusinessService.update(+id, body);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.otherBusinessService.remove(+id);
  // }

  @MessagePattern({path: 'deleteother/business'})
  delete(id: number) {
      return this.otherBusinessService.remove(id);
  }
}
