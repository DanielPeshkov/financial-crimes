import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtherReport } from 'src/other-report/other-report';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class OtherReportService {

  constructor(@InjectRepository(OtherReport) private repo: Repository<OtherReport>) {}

  async create(otherReport: OtherReport): Promise<OtherReport> {
    return await this.repo.save(otherReport);
  }

  async findAll(): Promise<OtherReport[]> {
    return await this.repo.find({
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

  async findOne(id: number): Promise<OtherReport> {
    return await this.repo.findOneOrFail({
      where: {
        id: id
      },
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
    }).catch(err => {
      throw new HttpException(`OtherReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: OtherReport): Promise<OtherReport> {
    let otherReport = await this.repo.findOneBy({id: id});
    if (!otherReport) {
      throw new HttpException(`OtherReport with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(otherReport, data);
    await this.repo.update({id: id}, otherReport).catch(err => {
      throw new HttpException(`Update otherReport ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
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

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
