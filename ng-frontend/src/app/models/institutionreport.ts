import { Contact } from "./contact";
import { InstitutionBusiness } from "./institutionbusiness";
import { InstitutionIndividual } from "./institutionindividual";

export class InstitutionReport {
    id: number;
    amount: number;
    institution: string;
    incidentdate: Date;
    approx: boolean;
    method: string;
    employee: boolean;
    source: string;
    documentation: boolean;
    description: string;
    contactid: number;
    status: number;
    created: Date;
    updated: Date;

    contact: Contact;
    institutionbusiness: InstitutionBusiness[];
    institutionindividual: InstitutionIndividual[];

    constructor(id: number, amount: number, institution: string, 
        incidentdate: Date, approx: boolean, method: string, employee: boolean,
        source: string, documentation: boolean, description: string, 
        contactid: number, status: number, created: Date, updated: Date, 
        contact: Contact, business: InstitutionBusiness[], 
        individual: InstitutionIndividual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.institution = institution;
        this.incidentdate = incidentdate;
        this.approx = approx;
        this.method = method;
        this.employee = employee;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactid = contactid;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.institutionbusiness = business;
        this.institutionindividual = individual;
    }
}