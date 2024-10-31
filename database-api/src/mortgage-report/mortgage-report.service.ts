import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MortgageReport } from './mortgage-report';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class MortgageReportService {

  constructor(@InjectRepository(MortgageReport) private repo: Repository<MortgageReport>) {}

  async create(mortgageReport: MortgageReport): Promise<MortgageReport> {
    return await this.repo.save(mortgageReport);
  }

  async findAll(): Promise<MortgageReport[]> {
    return await this.repo.find({
      relations: {
        contact: true,
        mortgagebusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        mortgageindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    });
  }

  async findOne(id: number): Promise<MortgageReport> {
    return await this.repo.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        contact: true,
        mortgagebusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        mortgageindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    }).catch(err => {
      throw new HttpException(`MortgageReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: MortgageReport): Promise<MortgageReport> {
    let mortgageReport = await this.repo.findOneBy({id: id});
    if (!mortgageReport) {
      throw new HttpException(`MortgageReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(mortgageReport, data);
    await this.repo.update({id: id}, mortgageReport).catch(err => {
      throw new HttpException(`Update mortgageReport ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
      relations: {
        contact: true,
        mortgagebusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        mortgageindividual: {
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
