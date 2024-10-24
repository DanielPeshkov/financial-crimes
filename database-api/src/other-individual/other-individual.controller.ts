import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { OtherIndividualService } from './other-individual.service';
import { OtherIndividual } from './other-individual';

@Controller('other/individual')
export class OtherIndividualController {
  constructor(private readonly otherIndividualService: OtherIndividualService) {}

  @Post()
  @HttpCode(201)
  create(@Body() otherIndividual: OtherIndividual) {
    return this.otherIndividualService.create(otherIndividual);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.otherIndividualService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.otherIndividualService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() otherIndividual: OtherIndividual) {
    return this.otherIndividualService.update(+id, otherIndividual);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.otherIndividualService.remove(+id);
  }
}
