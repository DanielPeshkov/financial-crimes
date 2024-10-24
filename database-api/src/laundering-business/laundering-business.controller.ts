import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { LaunderingBusinessService } from './laundering-business.service';
import { LaunderingBusiness } from './laundering-business';

@Controller('laundering/business')
export class LaunderingBusinessController {
  constructor(private readonly launderingBusinessService: LaunderingBusinessService) {}

  @Post()
  @HttpCode(201)
  create(@Body() launderingBusiness: LaunderingBusiness) {
    return this.launderingBusinessService.create(launderingBusiness);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.launderingBusinessService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.launderingBusinessService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() launderingBusiness: LaunderingBusiness) {
    return this.launderingBusinessService.update(+id, launderingBusiness);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.launderingBusinessService.remove(+id);
  }
}
