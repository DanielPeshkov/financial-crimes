import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [TypeOrmModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
