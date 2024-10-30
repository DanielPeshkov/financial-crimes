import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AddressService {

  constructor(@InjectRepository(Address) private repo: Repository<Address>) {}

  async create(address: Address): Promise<Address> {
    return await this.repo.save(address);
  }

  async findAll(): Promise<Address[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Address> {
    return await this.repo.findOneOrFail({
      where: {
        id: id
      }
    }).catch(() => {
      throw new HttpException(`Address with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: Address): Promise<Address> {
    const address = await this.repo.findOneBy({id: id});
    if (!address) {
      throw new HttpException(`Address with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    
    await this.repo.update({id: id}, data).catch(err => {
      throw new HttpException(`Update address ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    return await this.repo.findOneBy({id: id});
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
