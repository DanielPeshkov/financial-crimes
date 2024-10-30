import { Contact } from 'src/contact/contact';
import { DeleteResult, Repository } from 'typeorm';
export declare class ContactService {
    private repo;
    constructor(repo: Repository<Contact>);
    create(contact: Contact): Promise<Contact>;
    findAll(): Promise<Contact[]>;
    findOne(id: number): Promise<Contact>;
    update(id: number, data: Contact): Promise<Contact>;
    remove(id: number): Promise<DeleteResult>;
}
