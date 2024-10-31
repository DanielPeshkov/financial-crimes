import { Module } from '@nestjs/common';
import { MortgageIndividualService } from './mortgage-individual.service';
import { MortgageIndividualController } from './mortgage-individual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MortgageIndividual } from './mortgage-individual';

@Module({
  imports: [TypeOrmModule.forFeature([MortgageIndividual])],
  exports: [TypeOrmModule],
  controllers: [MortgageIndividualController],
  providers: [MortgageIndividualService],
})
export class MortgageIndividualModule {}
