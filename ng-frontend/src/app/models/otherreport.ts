import { Business } from "./business";
import { Contact } from "./contact";
import { Individual } from "./individual";
import { OtherBusiness } from "./otherbusiness";
import { OtherIndividual } from "./otherindividual";

export class OtherReport {
    id: number;
    type: string;
    source: string;
    incidentdate: Date;
    approx: boolean;
    location: string;
    documentation: boolean;
    description: string;
    contactid: number;
    status: number;
    created: string;
    updated: Date;

    contact: Contact | null;
    otherbusiness: Business[];
    otherindividual: Individual[];

    constructor(id: number, type: string, source: string, 
        incidentdate: Date, approx: boolean, location: string, documentation: boolean, 
        description: string, contactid: number, status: number, created: string, 
        updated: Date, contact: Contact | null, business: Business[], 
        individual: Individual[]
    ) {
        this.id = id;
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
