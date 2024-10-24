import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/contact';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {

  constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>) {}

  create() {
    return 'This action adds a new contact';
  }

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
