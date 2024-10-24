import { Module } from '@nestjs/common';
import { OtherIndividualService } from './other-individual.service';
import { OtherIndividualController } from './other-individual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherIndividual } from './other-individual';

@Module({
  imports: [TypeOrmModule.forFeature([OtherIndividual])],
  exports: [TypeOrmModule],
  controllers: [OtherIndividualController],
  providers: [OtherIndividualService],
})
export class OtherIndividualModule {}
