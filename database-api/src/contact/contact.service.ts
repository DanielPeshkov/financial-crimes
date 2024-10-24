import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/contact';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ContactService {

  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  async create(contact: Contact): Promise<Contact> {
    return await this.repo.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Contact> {
    return await this.repo.findOneOrFail({
      where: {
        id: id
      }
    }).catch(() => {
      throw new HttpException(`Address with ID ${id} does not exist`, HttpStatus.NOT_FOUND)
    });
  }

  async update(id: number, data: Contact): Promise<Contact> {
    const contact = await this.repo.findOneBy({id: id});
    if (!contact) {
      throw new HttpException(`Contact with ID ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    
    await this.repo.update({id: id}, data).catch(err => {
      throw new HttpException(`Update contact ${id} failed: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    return await this.repo.findOneBy({id: id});
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
