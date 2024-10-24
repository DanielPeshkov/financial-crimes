import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionBusinessService } from './institution-business.service';

@Controller('institution/business')
export class InstitutionBusinessController {
  constructor(private readonly institutionBusinessService: InstitutionBusinessService) {}

  @Post()
  create() {
    return this.institutionBusinessService.create();
  }

  @Get()
  findAll() {
    return this.institutionBusinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionBusinessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.institutionBusinessService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionBusinessService.remove(+id);
  }
}
