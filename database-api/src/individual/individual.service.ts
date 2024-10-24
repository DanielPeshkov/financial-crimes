import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Individual } from './individual';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class IndividualService {

  constructor(@InjectRepository(Individual) private repo: Repository<Individual>) {}

  async create(individual: Individual): Promise<Individual> {
    return await this.repo.save(individual);
  }

  async findAll(): Promise<Individual[]> {
    return await this.repo.find({
                  relations: {
                    contact: true,
                    address: true
                  }
                });
  }

  async findOne(id: number): Promise<Individual> {
    return await this.repo.findOneOrFail({
      where: {
        id: id,
      }, 
      relations: {
        contact: true,
        address: true,
      }
    }).catch(err => {
      throw new HttpException(`Individual with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: Individual): Promise<Individual> {
    let individual = await this.repo.findOneBy({id: id});
    if (!individual) {
      throw new HttpException(`Individual with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(individual, data);
    await this.repo.update({id: id}, individual).catch(err => {
      throw new HttpException(`Update individual ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }, 
      relations: {
        contact: true,
        address: true,
      }
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
