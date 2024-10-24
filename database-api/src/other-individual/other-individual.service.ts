import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtherIndividual } from './other-individual';
import { Repository } from 'typeorm';

@Injectable()
export class OtherIndividualService {

  constructor(@InjectRepository(OtherIndividual) private repo: Repository<OtherIndividual>) {}

  create() {
    return 'This action adds a new otherIndividual';
  }

  findAll(): Promise<OtherIndividual[]> {
    return this.repo.find({
      relations: {
        report: {
          contact: true,
        },
        individual: {
          contact: true,
          address: true,
        },
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} otherIndividual`;
  }

  update(id: number) {
    return `This action updates a #${id} otherIndividual`;
  }

  remove(id: number) {
    return `This action removes a #${id} otherIndividual`;
  }
}
