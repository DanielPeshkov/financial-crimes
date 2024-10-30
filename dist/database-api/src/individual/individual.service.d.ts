import { Individual } from './individual';
import { DeleteResult, Repository } from 'typeorm';
export declare class IndividualService {
    private repo;
    constructor(repo: Repository<Individual>);
    create(individual: Individual): Promise<Individual>;
    findAll(): Promise<Individual[]>;
    findOne(id: number): Promise<Individual>;
    update(id: number, data: Individual): Promise<Individual>;
    remove(id: number): Promise<DeleteResult>;
}
