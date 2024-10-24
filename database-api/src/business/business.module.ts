import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './business';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  exports: [TypeOrmModule],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
