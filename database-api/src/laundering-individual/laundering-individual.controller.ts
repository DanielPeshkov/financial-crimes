import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { LaunderingIndividualService } from './laundering-individual.service';
import { LaunderingIndividual } from './laundering-individual';

@Controller('laundering/individual')
export class LaunderingIndividualController {
  constructor(private readonly launderingIndividualService: LaunderingIndividualService) {}

  @Post()
  @HttpCode(200)
  create(@Body() launderingIndividual: LaunderingIndividual) {
    return this.launderingIndividualService.create(launderingIndividual);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.launderingIndividualService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.launderingIndividualService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() launderingIndividual: LaunderingIndividual) {
    return this.launderingIndividualService.update(+id, launderingIndividual);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.launderingIndividualService.remove(+id);
  }
}
