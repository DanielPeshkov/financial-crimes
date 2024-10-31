import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbezzlementBusiness } from './embezzlement-business';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class EmbezzlementBusinessService {

  constructor(@InjectRepository(EmbezzlementBusiness) private repo: Repository<EmbezzlementBusiness>) {}

  async create(embezzlementBusiness: EmbezzlementBusiness): Promise<EmbezzlementBusiness> {
    return await this.repo.save(embezzlementBusiness);
  }

  async findAll(): Promise<EmbezzlementBusiness[]> {
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

  async findOne(id: number): Promise<EmbezzlementBusiness> {
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
      throw new HttpException(`EmbezzlementBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: EmbezzlementBusiness): Promise<EmbezzlementBusiness> {
    let embezzlementBusiness = await this.repo.findOneBy({id: id});
    if (!embezzlementBusiness) {
      throw new HttpException(`EmbezzlementBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(embezzlementBusiness, data);
    await this.repo.update({id: id}, embezzlementBusiness).catch(err => {
      throw new HttpException(`Update embezzlementBusiness ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
