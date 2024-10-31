import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbezzlementReport } from './embezzlement-report';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class EmbezzlementReportService {

  constructor(@InjectRepository(EmbezzlementReport) private repo: Repository<EmbezzlementReport>) {}

  async create(embezzlementReport: EmbezzlementReport): Promise<EmbezzlementReport> {
    return await this.repo.save(embezzlementReport);
  }

  async findAll(): Promise<EmbezzlementReport[]> {
    return await this.repo.find({
      relations: {
        contact: true,
        embezzlementbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        embezzlementindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    });
  }

  async findOne(id: number): Promise<EmbezzlementReport> {
    return await this.repo.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        contact: true,
        embezzlementbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        embezzlementindividual: {
          individual: {
            contact: true,
            address: true,
          },
        },
      }
    }).catch(err => {
      throw new HttpException(`EmbezzlementReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: EmbezzlementReport): Promise<EmbezzlementReport> {
    let embezzlementReport = await this.repo.findOneBy({id: id});
    if (!embezzlementReport) {
      throw new HttpException(`EmbezzlementReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(embezzlementReport, data);
    await this.repo.update({id: id}, embezzlementReport).catch(err => {
      throw new HttpException(`Update embezzlementReport ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
      relations: {
        contact: true,
        embezzlementbusiness: {
          business: {
            contact: true,
            address: true,
          }
        }, 
        embezzlementindividual: {
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
