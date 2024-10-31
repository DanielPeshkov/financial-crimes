import { Module } from '@nestjs/common';
import { EmbezzlementIndividualService } from './embezzlement-individual.service';
import { EmbezzlementIndividualController } from './embezzlement-individual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbezzlementIndividual } from './embezzlement-individual';

@Module({
  imports: [TypeOrmModule.forFeature([EmbezzlementIndividual])],
  exports: [TypeOrmModule],
  controllers: [EmbezzlementIndividualController],
  providers: [EmbezzlementIndividualService],
})
export class EmbezzlementIndividualModule {}
