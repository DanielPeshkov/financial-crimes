import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionBusiness } from './institution-business';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class InstitutionBusinessService {

  constructor(@InjectRepository(InstitutionBusiness) private repo: Repository<InstitutionBusiness>) {}

  async create(institutionBusiness: InstitutionBusiness): Promise<InstitutionBusiness> {
    return await this.repo.save(institutionBusiness);
  }

  async findAll(): Promise<InstitutionBusiness[]> {
    return await this.repo.find({
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

  async findOne(id: number): Promise<InstitutionBusiness> {
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
        }
      }
    }).catch(err => {
      throw new HttpException(`InstitutionBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: InstitutionBusiness): Promise<InstitutionBusiness> {
    let institutionBusiness = await this.repo.findOneBy({id: id});
    if (!institutionBusiness) {
      throw new HttpException(`InstitutionBusiness with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(institutionBusiness, data);
    await this.repo.update({id: id}, institutionBusiness).catch(err => {
      throw new HttpException(`Update institutionBusiness ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
