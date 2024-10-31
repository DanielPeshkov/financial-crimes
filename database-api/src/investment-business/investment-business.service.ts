import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestmentBusiness } from './investment-business';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class InvestmentBusinessService {

  constructor(@InjectRepository(InvestmentBusiness) private repo: Repository<InvestmentBusiness>) {}

  async create(investmentBusiness: InvestmentBusiness): Promise<InvestmentBusiness> {
    return await this.repo.save(investmentBusiness);
  }

  async findAll(): Promise<InvestmentBusiness[]> {
    return await this.repo.find({
      relations: {
        report: {
          contact: true,
        },
        business: {
          contact: true,
          address: true,
        },
      }
    });
  }

  async findOne(id: number): Promise<InvestmentBusiness> {
    return await this.repo.findOneOrFail({
      relations: {
        report: {
          contact: true,
        },
        business: {
          contact: true,
          address: true,
        },
      }
    }).catch(err => {
      throw new HttpException(`InvestmentBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: InvestmentBusiness): Promise<InvestmentBusiness> {
    let investmentBusiness = await this.repo.findOneBy({id: id});
    if (!investmentBusiness) {
      throw new HttpException(`InvestmentBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(investmentBusiness, data);
    await this.repo.update({id: id}, investmentBusiness).catch(err => {
      throw new HttpException(`Update investmentBusiness ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
      relations: {
        report: {
          contact: true,
        }, 
        business: {
          contact: true,
          address: true,
        }
      }
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
