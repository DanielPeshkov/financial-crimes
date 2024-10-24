import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './business';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BusinessService {

  constructor(@InjectRepository(Business) private repo: Repository<Business>) {}

  async create(business: Business): Promise<Business> {
    return await this.repo.save(business);
  }

  async findAll(): Promise<Business[]> {
    return await this.repo.find({
      relations: {
        contact: true,
        address: true
      }
    });
  }

  async findOne(id: number): Promise<Business> {
    return await this.repo.findOneOrFail({
      where: {
        id: id
      }, 
      relations: {
        contact: true, 
        address: true,
      }
    }).catch(() => {
      throw new HttpException(`Address with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: Business): Promise<Business> {
    let business = await this.repo.findOneBy({id: id});
    if (!business) {
      throw new HttpException(`Business with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(business, data);
    await this.repo.update({id: id}, business).catch(err => {
      throw new HttpException(`Update business ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOneBy({id: id});
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
