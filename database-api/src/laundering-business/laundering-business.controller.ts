import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaunderingBusinessService } from './laundering-business.service';

@Controller('laundering/business')
export class LaunderingBusinessController {
  constructor(private readonly launderingBusinessService: LaunderingBusinessService) {}

  @Post()
  create() {
    return this.launderingBusinessService.create();
  }

  @Get()
  findAll() {
    return this.launderingBusinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.launderingBusinessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.launderingBusinessService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.launderingBusinessService.remove(+id);
  }
}
