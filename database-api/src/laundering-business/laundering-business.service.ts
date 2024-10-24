import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunderingBusiness } from './laundering-business';
import { Repository } from 'typeorm';

@Injectable()
export class LaunderingBusinessService {

  constructor(@InjectRepository(LaunderingBusiness) private repo: Repository<LaunderingBusiness>) {}

  create() {
    return 'This action adds a new launderingBusiness';
  }

  findAll(): Promise<LaunderingBusiness[]> {
    return this.repo.find({
      relations: {
        report: {
          contact: true,
        },
        business: {
          contact: true,
          address: true,
        },
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} launderingBusiness`;
  }

  update(id: number) {
    return `This action updates a #${id} launderingBusiness`;
  }

  remove(id: number) {
    return `This action removes a #${id} launderingBusiness`;
  }
}
