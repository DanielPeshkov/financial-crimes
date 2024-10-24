import { Module } from '@nestjs/common';
import { IndividualService } from './individual.service';
import { IndividualController } from './individual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Individual } from './individual';

@Module({
  imports: [TypeOrmModule.forFeature([Individual])],
  exports: [TypeOrmModule],
  controllers: [IndividualController],
  providers: [IndividualService],
})
export class IndividualModule {}
