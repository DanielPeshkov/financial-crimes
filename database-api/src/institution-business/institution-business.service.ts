import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionBusiness } from './institution-business';
import { Repository } from 'typeorm';

@Injectable()
export class InstitutionBusinessService {

  constructor(@InjectRepository(InstitutionBusiness) private repo: Repository<InstitutionBusiness>) {}

  create() {
    return 'This action adds a new institutionBusiness';
  }

  findAll(): Promise<InstitutionBusiness[]> {
    return this.repo.find({
      relations: {
        report: {
          contact: true,
        }, 
        business: {
          contact: true,
          address: true,
        }
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} institutionBusiness`;
  }

  update(id: number) {
    return `This action updates a #${id} institutionBusiness`;
  }

  remove(id: number) {
    return `This action removes a #${id} institutionBusiness`;
  }
}
