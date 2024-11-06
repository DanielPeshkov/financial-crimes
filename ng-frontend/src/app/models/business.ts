import { Address, createAddress } from "./address";
import { Contact, createContact } from "./contact";

export class Business {
    id: number | null;
    name: string | null;
    contactid: number | null;
    addressid: number | null;

    contact: Contact | null;
    address: Address | null;

    constructor(id: number | null, name: string, contactid: number, addressid: number, 
        contact: Contact | null, address: Address | null) {
        this.id = id;
        this.name = name;
        this.contactid = contactid;
        this.addressid = addressid;

        this.contact = contact;
        this.address = address;
    }
}

export function createBusiness(data: any): Business {
    let {id, name, contactid, addressid, contact, address, ...etc} = data;
    contact = createContact(contact);
    address = createAddress(address);

    const business = new Business(id, name, contactid, addressid, contact, address);
    return business;
}
