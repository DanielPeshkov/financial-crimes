import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaunderingIndividualService } from './laundering-individual.service';

@Controller('laundering/individual')
export class LaunderingIndividualController {
  constructor(private readonly launderingIndividualService: LaunderingIndividualService) {}

  @Post()
  create() {
    return this.launderingIndividualService.create();
  }

  @Get()
  findAll() {
    return this.launderingIndividualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.launderingIndividualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.launderingIndividualService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.launderingIndividualService.remove(+id);
  }
}
