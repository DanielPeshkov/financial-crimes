import { Contact } from "./contact";
import { OtherBusiness } from "./otherbusiness";
import { OtherIndividual } from "./otherindividual";

export class OtherReport {
    id: number;
    amount: number;
    type: string;
    source: string;
    incidentdate: Date;
    approx: boolean;
    location: string;
    documentation: boolean;
    description: string;
    contactid: number;
    status: number;
    created: Date;
    updated: Date;

    contact: Contact;
    otherbusiness: OtherBusiness[];
    otherindividual: OtherIndividual[];

    constructor(id: number, amount: number, type: string, source: string, 
        incidentdate: Date, approx: boolean, location: string, documentation: boolean, 
        description: string, contactid: number, status: number, created: Date, 
        updated: Date, contact: Contact, business: OtherBusiness[], 
        individual: OtherIndividual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.source = source;
        this.incidentdate = incidentdate;
        this.approx = approx;
        this.location = location;
        this.type = type;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactid = contactid;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.otherbusiness = business;
        this.otherindividual = individual;
    }
}
