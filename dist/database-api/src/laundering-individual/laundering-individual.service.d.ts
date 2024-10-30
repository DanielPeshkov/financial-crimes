import { LaunderingIndividual } from './laundering-individual';
import { DeleteResult, Repository } from 'typeorm';
export declare class LaunderingIndividualService {
    private repo;
    constructor(repo: Repository<LaunderingIndividual>);
    create(launderingIndividual: LaunderingIndividual): Promise<LaunderingIndividual>;
    findAll(): Promise<LaunderingIndividual[]>;
    findOne(id: number): Promise<LaunderingIndividual>;
    update(id: number, data: LaunderingIndividual): Promise<LaunderingIndividual>;
    remove(id: number): Promise<DeleteResult>;
}
