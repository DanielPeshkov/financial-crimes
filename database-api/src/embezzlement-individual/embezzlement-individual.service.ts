import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmbezzlementIndividual } from './embezzlement-individual';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class EmbezzlementIndividualService {

  constructor(@InjectRepository(EmbezzlementIndividual) private repo: Repository<EmbezzlementIndividual>) {}

  async create(embezzlementIndividual: EmbezzlementIndividual): Promise<EmbezzlementIndividual> {
    return await this.repo.save(embezzlementIndividual);
  }

  async findAll(): Promise<EmbezzlementIndividual[]> {
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

  async findOne(id: number): Promise<EmbezzlementIndividual> {
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
      throw new HttpException(`EmbezzlementIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: EmbezzlementIndividual): Promise<EmbezzlementIndividual> {
    let embezzlementIndividual = await this.repo.findOneBy({id: id});
    if (!embezzlementIndividual) {
      throw new HttpException(`EmbezzlementIndividual with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(embezzlementIndividual, data);
    await this.repo.update({id: id}, embezzlementIndividual).catch(err => {
      throw new HttpException(`Update embezzlementIndividual ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
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
