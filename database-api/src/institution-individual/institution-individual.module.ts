import { Module } from '@nestjs/common';
import { InstitutionIndividualService } from './institution-individual.service';
import { InstitutionIndividualController } from './institution-individual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionIndividual } from './institution-individual';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionIndividual])],
  exports: [TypeOrmModule],
  controllers: [InstitutionIndividualController],
  providers: [InstitutionIndividualService],
})
export class InstitutionIndividualModule {}
