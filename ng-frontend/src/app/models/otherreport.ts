import { Business } from "./business";
import { Contact } from "./contact";
import { Individual } from "./individual";
import { OtherBusiness } from "./otherbusiness";
import { OtherIndividual } from "./otherindividual";

export class OtherReport {
    id: number | null;
    type: string | null;
    source: string | null;
    incidentDate: string | null;
    approx: boolean | null;
    location: string | null;
    documentation: boolean | null;
    description: string | null;
    contactId: number | null;
    status: number | null;
    created: string | null;
    updated: string | null;

    contact: Contact | null;
    otherbusiness: OtherBusiness[];
    otherindividual: OtherIndividual[];

    constructor(id: number | null, type: string | null, source: string | null, 
        incidentDate: string | null, approx: boolean | null, location: string | null, documentation: boolean | null, 
        description: string | null, contactId: number | null, status: number | null, created: string | null, 
        updated: string | null, contact: Contact | null, business: OtherBusiness[], 
        individual: OtherIndividual[]
    ) {
        this.id = id;
        this.type = type;
        this.source = source;
        this.incidentDate = incidentDate;
        this.approx = approx;
        this.location = location;
        this.type = type;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactId = contactId;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.otherbusiness = business;
        this.otherindividual = individual;
    }
}
