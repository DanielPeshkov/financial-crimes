import { Business } from "./business";
import { Contact } from "./contact";
import { Individual } from "./individual";
import { LaunderingBusiness } from "./launderingbusiness";
import { LaunderingIndividual } from "./launderingindividual";

export class LaunderingReport {
    id: number | null;
    amount: number | null;
    source: string | null;
    method: string | null;
    processing: string | null;
    location: string | null;
    incidentDate: string | null;
    approx: boolean | null;
    organized: string | null;
    documentation: boolean | null;
    description: string | null;
    contactId: number | null;
    status: number | null;
    created: string | null;
    updated: string | null;

    contact: Contact | null;
    launderingbusiness: Business[];
    launderingindividual: Individual[];

    constructor(id: number | null, amount: number | null, source: string | null, 
        method: string | null, processing: string | null, location: string | null, incidentDate: string | null,
        approx: boolean | null, organized: string | null, documentation: boolean | null, 
        description: string | null, contactId: number | null, status: number | null, created: string | null, 
        updated: string | null, contact: Contact | null, business: Business[], 
        individual: Individual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.source = source;
        this.method = method;
        this.processing = processing;
        this.location = location;
        this.incidentDate = incidentDate;
        this.approx = approx;
        this.organized = organized;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactId = contactId;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.launderingbusiness = business;
        this.launderingindividual = individual;
    }
}
