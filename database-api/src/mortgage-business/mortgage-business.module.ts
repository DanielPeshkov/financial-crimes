import { Module } from '@nestjs/common';
import { MortgageBusinessService } from './mortgage-business.service';
import { MortgageBusinessController } from './mortgage-business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MortgageBusiness } from './mortgage-business';

@Module({
  imports: [TypeOrmModule.forFeature([MortgageBusiness])],
  exports: [TypeOrmModule],
  controllers: [MortgageBusinessController],
  providers: [MortgageBusinessService],
})
export class MortgageBusinessModule {}
