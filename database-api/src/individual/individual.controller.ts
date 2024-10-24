import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndividualService } from './individual.service';

@Controller('individual')
export class IndividualController {
  constructor(private readonly individualService: IndividualService) {}

  @Post()
  create() {
    return this.individualService.create();
  }

  @Get()
  findAll() {
    return this.individualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.individualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.individualService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.individualService.remove(+id);
  }
}
