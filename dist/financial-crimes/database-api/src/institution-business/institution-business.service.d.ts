import { InstitutionBusiness } from './institution-business';
import { DeleteResult, Repository } from 'typeorm';
export declare class InstitutionBusinessService {
    private repo;
    constructor(repo: Repository<InstitutionBusiness>);
    create(institutionBusiness: InstitutionBusiness): Promise<InstitutionBusiness>;
    findAll(): Promise<InstitutionBusiness[]>;
    findOne(id: number): Promise<InstitutionBusiness>;
    update(id: number, data: InstitutionBusiness): Promise<InstitutionBusiness>;
    remove(id: number): Promise<DeleteResult>;
}
