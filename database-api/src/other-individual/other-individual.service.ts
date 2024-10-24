import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtherIndividual } from './other-individual';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class OtherIndividualService {

  constructor(@InjectRepository(OtherIndividual) private repo: Repository<OtherIndividual>) {}

  async create(otherIndividual: OtherIndividual): Promise<OtherIndividual> {
    return this.repo.save(otherIndividual);
  }

  async findAll(): Promise<OtherIndividual[]> {
    return this.repo.find({
      relations: {
        report: {
          contact: true,
        },
        individual: {
          contact: true,
          address: true,
        },
      }
    });
  }

  async findOne(id: number): Promise<OtherIndividual> {
    return this.repo.findOneOrFail({
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
        },
      }
    }).catch(err => {
      throw new HttpException(`OtherIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: OtherIndividual): Promise<OtherIndividual> {
    let otherIndividual = await this.repo.findOneBy({id: id});
    if (!otherIndividual) {
      throw new HttpException(`OtherIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(otherIndividual, data);
    await this.repo.update({id: id}, otherIndividual).catch(err => {
      throw new HttpException(`Update otherIndividual ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
