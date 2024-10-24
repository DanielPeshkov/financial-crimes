import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionIndividual } from './institution-individual';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class InstitutionIndividualService {

  constructor(@InjectRepository(InstitutionIndividual) private repo: Repository<InstitutionIndividual>) {}

  async create(institutionIndividual: InstitutionIndividual): Promise<InstitutionIndividual> {
    return await this.repo.save(institutionIndividual);
  }

  async findAll(): Promise<InstitutionIndividual[]> {
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

  async findOne(id: number): Promise<InstitutionIndividual> {
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
      throw new HttpException(`InstitutionIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: InstitutionIndividual): Promise<InstitutionIndividual> {
    let institutionIndividual = await this.repo.findOneBy({id: id});
    if (!institutionIndividual) {
      throw new HttpException(`InstitutionIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(institutionIndividual, data);
    await this.repo.update({id: id}, institutionIndividual).catch(err => {
      throw new HttpException(`Update institutionIndividual ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
