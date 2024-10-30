import { InstitutionIndividualService } from './institution-individual.service';
import { InstitutionIndividual } from './institution-individual';
export declare class InstitutionIndividualController {
    private readonly institutionIndividualService;
    constructor(institutionIndividualService: InstitutionIndividualService);
    create(individual: any): Promise<InstitutionIndividual>;
    findAll(data: string): Promise<InstitutionIndividual[]>;
    findOne(id: number): Promise<InstitutionIndividual>;
    update(payload: any): Promise<InstitutionIndividual>;
    delete(id: number): Promise<DeleteResult>;
}
