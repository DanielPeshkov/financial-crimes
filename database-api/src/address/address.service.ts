import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {

  constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) {}

  create() {
    return 'This action adds a new address';
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
