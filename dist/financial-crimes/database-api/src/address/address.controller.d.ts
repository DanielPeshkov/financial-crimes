import { AddressService } from './address.service';
import { Address } from './address';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(address: any): Promise<Address>;
    findAll(data: string): Promise<Address[]>;
    findOne(id: number): Promise<Address>;
    update(payload: any): Promise<Address>;
    delete(id: number): Promise<DeleteResult>;
}
