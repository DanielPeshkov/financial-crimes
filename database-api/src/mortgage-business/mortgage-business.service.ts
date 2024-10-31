import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MortgageBusiness } from './mortgage-business';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class MortgageBusinessService {

  constructor(@InjectRepository(MortgageBusiness) private repo: Repository<MortgageBusiness>) {}

  async create(mortgageBusiness: MortgageBusiness): Promise<MortgageBusiness> {
    return await this.repo.save(mortgageBusiness);
  }

  async findAll(): Promise<MortgageBusiness[]> {
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

  async findOne(id: number): Promise<MortgageBusiness> {
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
      throw new HttpException(`MortgageBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: MortgageBusiness): Promise<MortgageBusiness> {
    let mortgageBusiness = await this.repo.findOneBy({id: id});
    if (!mortgageBusiness) {
      throw new HttpException(`MortgageBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(mortgageBusiness, data);
    await this.repo.update({id: id}, mortgageBusiness).catch(err => {
      throw new HttpException(`Update mortgageBusiness ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
