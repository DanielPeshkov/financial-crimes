import { Module } from '@nestjs/common';
import { LaunderingBusinessService } from './laundering-business.service';
import { LaunderingBusinessController } from './laundering-business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunderingBusiness } from './laundering-business';

@Module({
  imports: [TypeOrmModule.forFeature([LaunderingBusiness])],
  exports: [TypeOrmModule],
  controllers: [LaunderingBusinessController],
  providers: [LaunderingBusinessService],
})
export class LaunderingBusinessModule {}
