import { BusinessService } from './business.service';
import { Business } from './business';
export declare class BusinessController {
    private readonly businessService;
    constructor(businessService: BusinessService);
    create(business: any): Promise<Business>;
    findAll(data: string): Promise<Business[]>;
    findOne(id: number): Promise<Business>;
    update(payload: any): Promise<Business>;
    delete(id: number): Promise<DeleteResult>;
}
