import { Address } from './address';
import { DeleteResult, Repository } from 'typeorm';
export declare class AddressService {
    private repo;
    constructor(repo: Repository<Address>);
    create(address: Address): Promise<Address>;
    findAll(): Promise<Address[]>;
    findOne(id: number): Promise<Address>;
    update(id: number, data: Address): Promise<Address>;
    remove(id: number): Promise<DeleteResult>;
}
