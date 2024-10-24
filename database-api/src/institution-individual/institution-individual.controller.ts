import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionIndividualService } from './institution-individual.service';

@Controller('institution/individual')
export class InstitutionIndividualController {
  constructor(private readonly institutionIndividualService: InstitutionIndividualService) {}

  @Post()
  create() {
    return this.institutionIndividualService.create();
  }

  @Get()
  findAll() {
    return this.institutionIndividualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionIndividualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.institutionIndividualService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institutionIndividualService.remove(+id);
  }
}
