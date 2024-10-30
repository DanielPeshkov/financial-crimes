import { InstitutionBusinessService } from './institution-business.service';
import { InstitutionBusiness } from './institution-business';
export declare class InstitutionBusinessController {
    private readonly institutionBusinessService;
    constructor(institutionBusinessService: InstitutionBusinessService);
    create(business: any): Promise<InstitutionBusiness>;
    findAll(data: string): Promise<InstitutionBusiness[]>;
    findOne(id: number): Promise<InstitutionBusiness>;
    update(payload: any): Promise<InstitutionBusiness>;
    delete(id: number): Promise<DeleteResult>;
}
