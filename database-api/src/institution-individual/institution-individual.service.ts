import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionIndividual } from './institution-individual';
import { Repository } from 'typeorm';

@Injectable()
export class InstitutionIndividualService {

  constructor(@InjectRepository(InstitutionIndividual) private repo: Repository<InstitutionIndividual>) {}

  create() {
    return 'This action adds a new institutionIndividual';
  }

  findAll(): Promise<InstitutionIndividual[]> {
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
    return `This action returns a #${id} institutionIndividual`;
  }

  update(id: number) {
    return `This action updates a #${id} institutionIndividual`;
  }

  remove(id: number) {
    return `This action removes a #${id} institutionIndividual`;
  }
}
