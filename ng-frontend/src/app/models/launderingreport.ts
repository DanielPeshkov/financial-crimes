import { Contact } from "./contact";
import { LaunderingBusiness } from "./launderingbusiness";
import { LaunderingIndividual } from "./launderingindividual";

export class LaunderingReport {
    id: number;
    amount: number;
    source: string;
    method: string;
    processing: string;
    location: string;
    incidentdate: Date;
    approx: boolean;
    organized: string;
    documentation: boolean;
    description: string;
    contactid: number;
    status: number;
    created: Date;
    updated: Date;

    contact: Contact;
    launderingbusiness: LaunderingBusiness[];
    launderingindividual: LaunderingIndividual[];

    constructor(id: number, amount: number, source: string, 
        method: string, processing: string, location: string, incidentdate: Date,
        approx: boolean, organized: string, documentation: boolean, 
        description: string, contactid: number, status: number, created: Date, 
        updated: Date, contact: Contact, business: LaunderingBusiness[], 
        individual: LaunderingIndividual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.source = source;
        this.method = method;
        this.processing = processing;
        this.location = location;
        this.incidentdate = incidentdate;
        this.approx = approx;
        this.organized = organized;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactid = contactid;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.launderingbusiness = business;
        this.launderingindividual = individual;
    }
}
