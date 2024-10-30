import { OtherBusiness } from './other-business';
import { DeleteResult, Repository } from 'typeorm';
export declare class OtherBusinessService {
    private repo;
    constructor(repo: Repository<OtherBusiness>);
    create(otherBusiness: OtherBusiness): Promise<OtherBusiness>;
    findAll(): Promise<OtherBusiness[]>;
    findOne(id: number): Promise<OtherBusiness>;
    update(id: number, data: OtherBusiness): Promise<OtherBusiness>;
    remove(id: number): Promise<DeleteResult>;
}
