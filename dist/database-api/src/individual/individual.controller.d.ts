import { IndividualService } from './individual.service';
import { Individual } from './individual';
export declare class IndividualController {
    private readonly individualService;
    constructor(individualService: IndividualService);
    create(individual: any): Promise<Individual>;
    findAll(data: string): Promise<Individual[]>;
    findOne(id: number): Promise<Individual>;
    update(payload: any): Promise<Individual>;
    delete(id: number): Promise<DeleteResult>;
}
