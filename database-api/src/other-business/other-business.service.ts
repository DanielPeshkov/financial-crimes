import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OtherBusiness } from './other-business';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class OtherBusinessService {

  constructor(@InjectRepository(OtherBusiness) private repo: Repository<OtherBusiness>) {}

  async create(otherBusiness: OtherBusiness): Promise<OtherBusiness> {
    return await this.repo.save(otherBusiness);
  }

  async findAll(): Promise<OtherBusiness[]> {
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

  async findOne(id: number): Promise<OtherBusiness> {
    return await this.repo.findOneOrFail({
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
        },
      }
    }).catch(err => {
      throw new HttpException(`OtherBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: OtherBusiness): Promise<OtherBusiness> {
    let otherBusiness = await this.repo.findOneBy({id: id});
    if (!otherBusiness) {
      throw new HttpException(`OtherBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(otherBusiness, data);
    await this.repo.update({id: id}, otherBusiness).catch(err => {
      throw new HttpException(`Update otherBusiness ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
