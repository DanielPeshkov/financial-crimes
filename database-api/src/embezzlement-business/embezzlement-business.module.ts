import { Module } from '@nestjs/common';
import { EmbezzlementBusinessService } from './embezzlement-business.service';
import { EmbezzlementBusinessController } from './embezzlement-business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbezzlementBusiness } from './embezzlement-business';

@Module({
  imports: [TypeOrmModule.forFeature([EmbezzlementBusiness])],
  exports: [TypeOrmModule],
  controllers: [EmbezzlementBusinessController],
  providers: [EmbezzlementBusinessService],
})
export class EmbezzlementBusinessModule {}
