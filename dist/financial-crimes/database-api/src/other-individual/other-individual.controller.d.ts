import { OtherIndividualService } from './other-individual.service';
import { OtherIndividual } from './other-individual';
export declare class OtherIndividualController {
    private readonly otherIndividualService;
    constructor(otherIndividualService: OtherIndividualService);
    create(individual: any): Promise<OtherIndividual>;
    findAll(data: string): Promise<OtherIndividual[]>;
    findOne(id: number): Promise<OtherIndividual>;
    update(payload: any): Promise<OtherIndividual>;
    delete(id: number): Promise<DeleteResult>;
}
