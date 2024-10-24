import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './business';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessService {

  constructor(@InjectRepository(Business) private businessRepository: Repository<Business>) {}

  create() {
    return 'This action adds a new business';
  }

  findAll(): Promise<Business[]> {
    return this.businessRepository.find({
                relations: {
                  contact: true,
                  address: true
                }
                });
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
