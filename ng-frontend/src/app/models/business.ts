import { Address } from "./address";
import { Contact } from "./contact";

export class Business {
    id: number;
    name: string;
    contactid: number;
    addressid: number;

    contact: Contact;
    address: Address;

    constructor(id: number, name: string, contactid: number, addressid: number, 
        contact: Contact, address: Address) {
        this.id = id;
        this.name = name;
        this.contactid = contactid;
        this.addressid = addressid;

        this.contact = contact;
        this.address = address;
    }
}
