import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionReport } from './institution-report';
import { Repository } from 'typeorm';

@Injectable()
export class InstitutionReportService {

  constructor(@InjectRepository(InstitutionReport) private repo: Repository<InstitutionReport>) {}

  create() {
    return 'This action adds a new institutionReport';
  }

  findAll(): Promise<InstitutionReport[]> {
    return this.repo.find({
      relations: {
        contact: true,
        institutionbusiness: {
          business: {
            contact: true, 
            address: true,
          }
        }, 
        institutionindividual: {
          individual: {
            contact: true, 
            address: true,
          }
        }
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} institutionReport`;
  }

  update(id: number) {
    return `This action updates a #${id} institutionReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} institutionReport`;
  }
}
