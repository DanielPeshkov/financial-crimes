import { Business } from "./business";
import { Contact } from "./contact";
import { Individual } from "./individual";
import { InstitutionBusiness } from "./institutionbusiness";
import { InstitutionIndividual } from "./institutionindividual";

export class InstitutionReport {
    id: number | null;
    amount: number | null;
    institution: string | null;
    incidentDate: string | null;
    approx: boolean | null;
    method: string | null;
    employee: boolean | null;
    source: string | null;
    documentation: boolean | null;
    description: string | null;
    contactid: number | null;
    status: number | null;
    created: string | null;
    updated: string | null;

    contact: Contact | null;
    institutionbusiness: InstitutionBusiness[];
    institutionindividual: InstitutionIndividual[];

    constructor(id: number | null, amount: number | null, institution: string | null, 
        incidentDate: string | null, approx: boolean | null, method: string | null, employee: boolean | null,
        source: string | null, documentation: boolean | null, description: string | null, 
        contactid: number | null, status: number | null, created: string | null, updated: string | null, 
        contact: Contact | null, business: InstitutionBusiness[], 
        individual: InstitutionIndividual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.institution = institution;
        this.incidentDate = incidentDate;
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