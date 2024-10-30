import { Business } from './business';
import { DeleteResult, Repository } from 'typeorm';
export declare class BusinessService {
    private repo;
    constructor(repo: Repository<Business>);
    create(business: Business): Promise<Business>;
    findAll(): Promise<Business[]>;
    findOne(id: number): Promise<Business>;
    update(id: number, data: Business): Promise<Business>;
    remove(id: number): Promise<DeleteResult>;
}
