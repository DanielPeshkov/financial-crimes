import { Module } from '@nestjs/common';
import { InvestmentIndividualService } from './investment-individual.service';
import { InvestmentIndividualController } from './investment-individual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentIndividual } from './investment-individual';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentIndividual])],
  exports: [TypeOrmModule],
  controllers: [InvestmentIndividualController],
  providers: [InvestmentIndividualService],
})
export class InvestmentIndividualModule {}
