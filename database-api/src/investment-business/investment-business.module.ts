import { Module } from '@nestjs/common';
import { InvestmentBusinessService } from './investment-business.service';
import { InvestmentBusinessController } from './investment-business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentBusiness } from './investment-business';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentBusiness])],
  exports: [TypeOrmModule],
  controllers: [InvestmentBusinessController],
  providers: [InvestmentBusinessService],
})
export class InvestmentBusinessModule {}
