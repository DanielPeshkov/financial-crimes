import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunderingIndividual } from './laundering-individual';
import { Repository } from 'typeorm';

@Injectable()
export class LaunderingIndividualService {

  constructor(@InjectRepository(LaunderingIndividual) private repo: Repository<LaunderingIndividual>) {}

  create() {
    return 'This action adds a new launderingIndividual';
  }

  findAll(): Promise<LaunderingIndividual[]> {
    return this.repo.find({
      relations: {
        report: {
          contact: true,
        }, 
        individual: {
          contact: true, 
          address: true,
        }
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} launderingIndividual`;
  }

  update(id: number) {
    return `This action updates a #${id} launderingIndividual`;
  }

  remove(id: number) {
    return `This action removes a #${id} launderingIndividual`;
  }
}
