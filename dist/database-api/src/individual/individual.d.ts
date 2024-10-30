import { Address } from "../address/address";
import { Contact } from "../contact/contact";
export declare class Individual {
    id: number;
    firstname: string;
    middlename: string;
    lastname: string;
    birth: Date;
    approx: boolean;
    age: number;
    contactid: number;
    addressid: number;
    contact: Contact;
    address: Address;
}
