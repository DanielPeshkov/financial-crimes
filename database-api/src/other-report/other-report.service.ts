import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtherReport } from 'src/other-report/other-report';
import { Repository } from 'typeorm';

@Injectable()
export class OtherReportService {

  constructor(@InjectRepository(OtherReport) private repo: Repository<OtherReport>) {}

  create() {
    return 'This action adds a new otherReport';
  }

  findAll(): Promise<OtherReport[]> {
    return this.repo.find({
      relations: {
        contact: true,
        otherbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        otherindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} otherReport`;
  }

  update(id: number) {
    return `This action updates a #${id} otherReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} otherReport`;
  }
}
