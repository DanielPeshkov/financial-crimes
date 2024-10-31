import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvestmentIndividual } from './investment-individual';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class InvestmentIndividualService {

  constructor(@InjectRepository(InvestmentIndividual) private repo: Repository<InvestmentIndividual>) {}

  async create(investmentIndividual: InvestmentIndividual): Promise<InvestmentIndividual> {
    return await this.repo.save(investmentIndividual);
  }

  async findAll(): Promise<InvestmentIndividual[]> {
    return await this.repo.find({
      relations: {
        report: {
          contact: true,
        }, 
        individual: {
          contact: true, 
          address: true,
        }
      }
    });
  }

  async findOne(id: number): Promise<InvestmentIndividual> {
    return await this.repo.findOneOrFail({
      where: {
        id: id
      },
      relations: {
        report: {
          contact: true,
        }, 
        individual: {
          contact: true, 
          address: true,
        }
      }
    }).catch(err => {
      throw new HttpException(`InvestmentIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: InvestmentIndividual): Promise<InvestmentIndividual> {
    let investmentIndividual = await this.repo.findOneBy({id: id});
    if (!investmentIndividual) {
      throw new HttpException(`InvestmentIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(investmentIndividual, data);
    await this.repo.update({id: id}, investmentIndividual).catch(err => {
      throw new HttpException(`Update investmentIndividual ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
      relations: {
        report: {
          contact: true,
        }, 
        individual: {
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
