import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Individual } from './individual';
import { Repository } from 'typeorm';

@Injectable()
export class IndividualService {

  constructor(@InjectRepository(Individual) private individualRepository: Repository<Individual>) {}

  create() {
    return 'This action adds a new individual';
  }

  findAll(): Promise<Individual[]> {
    return this.individualRepository.find({
                  relations: {
                    contact: true,
                    address: true
                  }
                });
  }

  findOne(id: number) {
    return `This action returns a #${id} individual`;
  }

  update(id: number) {
    return `This action updates a #${id} individual`;
  }

  remove(id: number) {
    return `This action removes a #${id} individual`;
  }
}
