import { LaunderingBusinessService } from './laundering-business.service';
import { LaunderingBusiness } from './laundering-business';
export declare class LaunderingBusinessController {
    private readonly launderingBusinessService;
    constructor(launderingBusinessService: LaunderingBusinessService);
    create(business: any): Promise<LaunderingBusiness>;
    findAll(data: string): Promise<LaunderingBusiness[]>;
    findOne(id: number): Promise<LaunderingBusiness>;
    update(payload: any): Promise<LaunderingBusiness>;
    delete(id: number): Promise<DeleteResult>;
}
