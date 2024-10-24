import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunderingBusiness } from './laundering-business';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class LaunderingBusinessService {

  constructor(@InjectRepository(LaunderingBusiness) private repo: Repository<LaunderingBusiness>) {}

  async create(launderingBusiness: LaunderingBusiness): Promise<LaunderingBusiness> {
    return await this.repo.save(launderingBusiness);
  }

  async findAll(): Promise<LaunderingBusiness[]> {
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

  async findOne(id: number): Promise<LaunderingBusiness> {
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
      throw new HttpException(`LaunderingBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: LaunderingBusiness): Promise<LaunderingBusiness> {
    let launderingBusiness = await this.repo.findOneBy({id: id});
    if (!launderingBusiness) {
      throw new HttpException(`LaunderingBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(launderingBusiness, data);
    await this.repo.update({id: id}, launderingBusiness).catch(err => {
      throw new HttpException(`Update launderingBusiness ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
