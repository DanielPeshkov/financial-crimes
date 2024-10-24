import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { InstitutionBusinessService } from './institution-business.service';
import { InstitutionBusiness } from './institution-business';

@Controller('institution/business')
export class InstitutionBusinessController {
  constructor(private readonly institutionBusinessService: InstitutionBusinessService) {}

  @Post()
  @HttpCode(201)
  create(@Body() institutionBusiness: InstitutionBusiness) {
    return this.institutionBusinessService.create(institutionBusiness);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.institutionBusinessService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.institutionBusinessService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() institutionBusiness: InstitutionBusiness) {
    return this.institutionBusinessService.update(+id, institutionBusiness);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.institutionBusinessService.remove(+id);
  }
}
