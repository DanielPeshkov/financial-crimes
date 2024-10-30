import { LaunderingIndividualService } from './laundering-individual.service';
import { LaunderingIndividual } from './laundering-individual';
export declare class LaunderingIndividualController {
    private readonly launderingIndividualService;
    constructor(launderingIndividualService: LaunderingIndividualService);
    create(individual: any): Promise<LaunderingIndividual>;
    findAll(data: string): Promise<LaunderingIndividual[]>;
    findOne(id: number): Promise<LaunderingIndividual>;
    update(payload: any): Promise<LaunderingIndividual>;
    delete(id: number): Promise<DeleteResult>;
}
