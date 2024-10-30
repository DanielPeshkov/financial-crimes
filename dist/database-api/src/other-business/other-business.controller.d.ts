import { OtherBusinessService } from './other-business.service';
import { OtherBusiness } from './other-business';
export declare class OtherBusinessController {
    private readonly otherBusinessService;
    constructor(otherBusinessService: OtherBusinessService);
    create(business: any): Promise<OtherBusiness>;
    findAll(data: string): Promise<OtherBusiness[]>;
    findOne(id: number): Promise<OtherBusiness>;
    update(payload: any): Promise<OtherBusiness>;
    delete(id: number): Promise<DeleteResult>;
}
