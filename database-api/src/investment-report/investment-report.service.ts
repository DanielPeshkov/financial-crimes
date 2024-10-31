import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestmentReport } from './investment-report';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class InvestmentReportService {

  constructor(@InjectRepository(InvestmentReport) private repo: Repository<InvestmentReport>) {}

  async create(investmentReport: InvestmentReport): Promise<InvestmentReport> {
    return await this.repo.save(investmentReport);
  }

  async findAll(): Promise<InvestmentReport[]> {
    return await this.repo.find({
      relations: {
        contact: true,
        investmentbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        investmentindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    });
  }

  async findOne(id: number): Promise<InvestmentReport> {
    return await this.repo.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        contact: true,
        investmentbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        investmentindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    }).catch(err => {
      throw new HttpException(`InvestmentReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: InvestmentReport): Promise<InvestmentReport> {
    let investmentReport = await this.repo.findOneBy({id: id});
    if (!investmentReport) {
      throw new HttpException(`InvestmentReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(investmentReport, data);
    await this.repo.update({id: id}, investmentReport).catch(err => {
      throw new HttpException(`Update investmentReport ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
      relations: {
        contact: true,
        investmentbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        investmentindividual: {
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
