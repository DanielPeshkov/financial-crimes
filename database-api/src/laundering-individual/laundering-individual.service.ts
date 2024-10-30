import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunderingIndividual } from './laundering-individual';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class LaunderingIndividualService {

  constructor(@InjectRepository(LaunderingIndividual) private repo: Repository<LaunderingIndividual>) {}

  async create(launderingIndividual: LaunderingIndividual): Promise<LaunderingIndividual> {
    return await this.repo.save(launderingIndividual);
  }

  async findAll(): Promise<LaunderingIndividual[]> {
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

  async findOne(id: number): Promise<LaunderingIndividual> {
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
      throw new HttpException(`LaunderingIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: LaunderingIndividual): Promise<LaunderingIndividual> {
    let launderingIndividual = await this.repo.findOneBy({id: id});
    if (!launderingIndividual) {
      throw new HttpException(`LaunderingIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(launderingIndividual, data);
    await this.repo.update({id: id}, launderingIndividual).catch(err => {
      throw new HttpException(`Update launderingIndividual ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
