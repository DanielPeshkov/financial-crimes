import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contact/contact';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  exports: [TypeOrmModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
