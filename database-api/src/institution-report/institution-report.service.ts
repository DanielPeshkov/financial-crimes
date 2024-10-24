import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionReport } from './institution-report';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class InstitutionReportService {

  constructor(@InjectRepository(InstitutionReport) private repo: Repository<InstitutionReport>) {}

  async create(institutionReport: InstitutionReport): Promise<InstitutionReport> {
    return await this.repo.save(institutionReport);
  }

  async findAll(): Promise<InstitutionReport[]> {
    return await this.repo.find({
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

  async findOne(id: number): Promise<InstitutionReport> {
    return await this.repo.findOneOrFail({
      where: {
        id: id,
      },
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
    }).catch(err => {
      throw new HttpException(`InstitutionReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: InstitutionReport): Promise<InstitutionReport> {
    let institutionReport = await this.repo.findOneBy({id: id});
    if (!institutionReport) {
      throw new HttpException(`InstitutionReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(institutionReport, data);
    await this.repo.update({id: id}, institutionReport).catch(err => {
      throw new HttpException(`Update institutionReport ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
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

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
