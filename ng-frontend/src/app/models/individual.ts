import { Address, createAddress } from "./address";
import { Contact, createContact } from "./contact";

export class Individual {
    id: number | null;
    firstname: string | null;
    middlename: string | null;
    lastname: string | null;
    birth: string | null;
    approx: boolean | null;
    age: number | null;
    contactid: number | null;
    addressid: number | null;

    contact: Contact | null;
    address: Address | null;

    constructor(id: number | null, firstName: string | null, middleName: string | null, 
                lastName: string | null, birth: string | null, approx: boolean | null, 
                age: number | null, contactId: number | null, addressId: number | null,
                contact: Contact | null, address: Address | null
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

export function createIndividual(data: any): Individual {
    let {id, firstName, middleName, lastName, birth, approx, age, contactId, 
        addressId, contact, address} = data;
    if (birth) {
        birth = birth.substring(0, 10);
    }
    contact = createContact(contact);
    address = createAddress(address);

    return new Individual(id, firstName, middleName, lastName, birth, approx, age, contactId, 
        addressId, contact, address);
}