import { Address } from "./address";
import { Contact } from "./contact";

export class Individual {
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

    constructor(id: number, firstName: string, middleName: string, 
                lastName: string, birth: Date, approx: boolean, 
                age: number, contactId: number, addressId: number,
                contact: Contact, address: Address
    ) {
        this.id = id;
        this.firstname = firstName;
        this.middlename = middleName;
        this.lastname = lastName;
        this.birth = birth;
        this.approx = approx;
        this.age = age;
        this.contactid = contactId;
        this.addressid = addressId;

        this.contact = contact;
        this.address = address;
    }
}
