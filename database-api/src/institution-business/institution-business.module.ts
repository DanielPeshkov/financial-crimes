import { Module } from '@nestjs/common';
import { InstitutionBusinessService } from './institution-business.service';
import { InstitutionBusinessController } from './institution-business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionBusiness } from './institution-business';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionBusiness])],
  exports: [TypeOrmModule],
  controllers: [InstitutionBusinessController],
  providers: [InstitutionBusinessService],
})
export class InstitutionBusinessModule {}
