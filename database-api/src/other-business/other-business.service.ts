import { Injectable } from '@nestjs/common';
import { OtherBusiness } from './other-business';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OtherBusinessService {

  constructor(@InjectRepository(OtherBusiness) private repo: Repository<OtherBusiness>) {}

  create() {
    return 'This action adds a new otherBusiness';
  }

  findAll(): Promise<OtherBusiness[]> {
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
    return `This action returns a #${id} otherBusiness`;
  }

  update(id: number) {
    return `This action updates a #${id} otherBusiness`;
  }

  remove(id: number) {
    return `This action removes a #${id} otherBusiness`;
  }
}
