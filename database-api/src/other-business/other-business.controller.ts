import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { OtherBusinessService } from './other-business.service';
import { OtherBusiness } from './other-business';

@Controller('other/business')
export class OtherBusinessController {
  constructor(private readonly otherBusinessService: OtherBusinessService) {}

  @Post()
  @HttpCode(201)
  create(@Body() otherBusiness: OtherBusiness) {
    return this.otherBusinessService.create(otherBusiness);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.otherBusinessService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.otherBusinessService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() otherBusiness: OtherBusiness) {
    return this.otherBusinessService.update(+id, otherBusiness);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.otherBusinessService.remove(+id);
  }
}
