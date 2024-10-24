import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunderingReport } from './laundering-report';
import { Repository } from 'typeorm';

@Injectable()
export class LaunderingReportService {

  constructor(@InjectRepository(LaunderingReport) private repo: Repository<LaunderingReport>) {}

  create() {
    return 'This action adds a new launderingReport';
  }

  findAll(): Promise<LaunderingReport[]> {
    return this.repo.find({
      relations: {
        contact: true,
        launderingbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        launderingindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} launderingReport`;
  }

  update(id: number) {
    return `This action updates a #${id} launderingReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} launderingReport`;
  }
}
