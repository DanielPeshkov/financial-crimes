import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MortgageIndividual } from './mortgage-individual';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class MortgageIndividualService {

  constructor(@InjectRepository(MortgageIndividual) private repo: Repository<MortgageIndividual>) {}

  async create(mortgageIndividual: MortgageIndividual): Promise<MortgageIndividual> {
    return await this.repo.save(mortgageIndividual);
  }

  async findAll(): Promise<MortgageIndividual[]> {
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

  async findOne(id: number): Promise<MortgageIndividual> {
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
      throw new HttpException(`MortgageIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: MortgageIndividual): Promise<MortgageIndividual> {
    let mortgageIndividual = await this.repo.findOneBy({id: id});
    if (!mortgageIndividual) {
      throw new HttpException(`MortgageIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(mortgageIndividual, data);
    await this.repo.update({id: id}, mortgageIndividual).catch(err => {
      throw new HttpException(`Update mortgageIndividual ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
