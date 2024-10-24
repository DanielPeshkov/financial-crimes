import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user: User): Promise<User> {
    return await this.repo.save(user);
  }
  
  async findAll(): Promise<User[]> {
      return await this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repo.findOneOrFail({
      where: {
        id: id
      }
    }).catch(err => {
      throw new HttpException(`User with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: User): Promise<User> {
    let user = await this.repo.findOneBy({id: id});
    if (!user) {
      throw new HttpException(`User with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    this.repo.merge(user, data);
    await this.repo.update({id: id}, user).catch(err => {
      throw new HttpException(`Update user ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    return await this.repo.findOne({
      where: {
        id: id
      }
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
