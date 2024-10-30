import { LaunderingBusiness } from './laundering-business';
import { DeleteResult, Repository } from 'typeorm';
export declare class LaunderingBusinessService {
    private repo;
    constructor(repo: Repository<LaunderingBusiness>);
    create(launderingBusiness: LaunderingBusiness): Promise<LaunderingBusiness>;
    findAll(): Promise<LaunderingBusiness[]>;
    findOne(id: number): Promise<LaunderingBusiness>;
    update(id: number, data: LaunderingBusiness): Promise<LaunderingBusiness>;
    remove(id: number): Promise<DeleteResult>;
}
