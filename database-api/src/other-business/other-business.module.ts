import { Module } from '@nestjs/common';
import { OtherBusinessService } from './other-business.service';
import { OtherBusinessController } from './other-business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherBusiness } from './other-business';

@Module({
  imports: [TypeOrmModule.forFeature([OtherBusiness])],
  exports: [TypeOrmModule],
  controllers: [OtherBusinessController],
  providers: [OtherBusinessService],
})
export class OtherBusinessModule {}
