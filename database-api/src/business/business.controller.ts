import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { BusinessService } from './business.service';
import { Business } from './business';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @HttpCode(201)
  create(@Body() business: Business) {
    return this.businessService.create(business);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() business: Business) {
    return this.businessService.update(+id, business);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }
}
