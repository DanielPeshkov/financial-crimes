import { ContactService } from './contact.service';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(contact: any): Promise<Contact>;
    findAll(data: string): Promise<Contact[]>;
    findOne(id: number): Promise<Contact>;
    update(payload: any): Promise<Contact>;
    delete(id: number): Promise<DeleteResult>;
}
