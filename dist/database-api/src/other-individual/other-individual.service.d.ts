import { OtherIndividual } from './other-individual';
import { DeleteResult, Repository } from 'typeorm';
export declare class OtherIndividualService {
    private repo;
    constructor(repo: Repository<OtherIndividual>);
    create(otherIndividual: OtherIndividual): Promise<OtherIndividual>;
    findAll(): Promise<OtherIndividual[]>;
    findOne(id: number): Promise<OtherIndividual>;
    update(id: number, data: OtherIndividual): Promise<OtherIndividual>;
    remove(id: number): Promise<DeleteResult>;
}
