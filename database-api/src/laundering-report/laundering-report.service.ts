import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunderingReport } from './laundering-report';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class LaunderingReportService {

  constructor(@InjectRepository(LaunderingReport) private repo: Repository<LaunderingReport>) {}

  async create(launderingReport: LaunderingReport): Promise<LaunderingReport> {
    return await this.repo.save(launderingReport);
  }

  async findAll(): Promise<LaunderingReport[]> {
    return await this.repo.find({
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

  async findOne(id: number): Promise<LaunderingReport> {
    return await this.repo.findOneOrFail({
      where: {
        id: id,
      },
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
    }).catch(err => {
      throw new HttpException(`LaunderingReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: LaunderingReport): Promise<LaunderingReport> {
    let launderingReport = await this.repo.findOneBy({id: id});
    if (!launderingReport) {
      throw new HttpException(`LaunderingReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(launderingReport, data);
    await this.repo.update({id: id}, launderingReport).catch(err => {
      throw new HttpException(`Update launderingReport ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
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

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
