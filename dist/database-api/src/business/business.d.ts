import { Contact } from "../contact/contact";
import { Address } from "../address/address";
export declare class Business {
    id: number;
    name: string;
    contactid: number;
    addressid: number;
    contact: Contact;
    address: Address;
}
