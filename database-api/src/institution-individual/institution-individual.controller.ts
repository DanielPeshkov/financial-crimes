import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { InstitutionIndividualService } from './institution-individual.service';
import { InstitutionIndividual } from './institution-individual';

@Controller('institution/individual')
export class InstitutionIndividualController {
  constructor(private readonly institutionIndividualService: InstitutionIndividualService) {}

  @Post()
  @HttpCode(201)
  create(@Body() institutionIndividual: InstitutionIndividual) {
    return this.institutionIndividualService.create(institutionIndividual);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.institutionIndividualService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.institutionIndividualService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() institutionIndividual: InstitutionIndividual) {
    return this.institutionIndividualService.update(+id, institutionIndividual);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.institutionIndividualService.remove(+id);
  }
}
