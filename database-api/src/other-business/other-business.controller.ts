import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtherBusinessService } from './other-business.service';

@Controller('other/business')
export class OtherBusinessController {
  constructor(private readonly otherBusinessService: OtherBusinessService) {}

  @Post()
  create() {
    return this.otherBusinessService.create();
  }

  @Get()
  findAll() {
    return this.otherBusinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherBusinessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.otherBusinessService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherBusinessService.remove(+id);
  }
}
