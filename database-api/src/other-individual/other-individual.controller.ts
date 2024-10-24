import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtherIndividualService } from './other-individual.service';

@Controller('other/individual')
export class OtherIndividualController {
  constructor(private readonly otherIndividualService: OtherIndividualService) {}

  @Post()
  create() {
    return this.otherIndividualService.create();
  }

  @Get()
  findAll() {
    return this.otherIndividualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherIndividualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.otherIndividualService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherIndividualService.remove(+id);
  }
}
