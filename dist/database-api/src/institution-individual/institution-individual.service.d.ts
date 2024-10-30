import { InstitutionIndividual } from './institution-individual';
import { DeleteResult, Repository } from 'typeorm';
export declare class InstitutionIndividualService {
    private repo;
    constructor(repo: Repository<InstitutionIndividual>);
    create(institutionIndividual: InstitutionIndividual): Promise<InstitutionIndividual>;
    findAll(): Promise<InstitutionIndividual[]>;
    findOne(id: number): Promise<InstitutionIndividual>;
    update(id: number, data: InstitutionIndividual): Promise<InstitutionIndividual>;
    remove(id: number): Promise<DeleteResult>;
}
