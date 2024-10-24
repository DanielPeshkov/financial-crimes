import { Module } from '@nestjs/common';
import { LaunderingIndividualService } from './laundering-individual.service';
import { LaunderingIndividualController } from './laundering-individual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunderingIndividual } from './laundering-individual';

@Module({
  imports: [TypeOrmModule.forFeature([LaunderingIndividual])],
  exports: [TypeOrmModule],
  controllers: [LaunderingIndividualController],
  providers: [LaunderingIndividualService],
})
export class LaunderingIndividualModule {}
