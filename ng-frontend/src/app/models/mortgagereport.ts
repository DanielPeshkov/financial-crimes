import { Business } from "./business";
import { Contact } from "./contact";
import { Individual } from "./individual";
import { MortgageBusiness } from "./mortgagebusiness";
import { MortgageIndividual } from "./mortgageindividual";

export class MortgageReport {
    id: number | null;
    amount: number | null;
	loan: number | null;
	payments: boolean | null;
	owner: string | null;
	addressid: number | null;
	mortgage: string | null;
	title: string | null;
	agent: string | null;
	type: string | null;
	source: string | null;
	documentation: boolean | null;
	description: string | null;
    contactid: number | null;
    status: number | null;
    created: string | null;
    updated: string | null;

    contact: Contact | null;
    mortgagebusiness: Business[];
    mortgageindividual: Individual[];

    constructor(id: number | null, amount: number | null, loan: number | null, payments: boolean | null, 
        owner: string | null, addressid: number | null, mortgage: string | null, title: string | null, 
        agent: string | null, type: string | null, source: string | null, documentation: boolean | null, 
        description: string | null, contactid: number | null, status: number | null, created: string | null, 
        updated: string | null, contact: Contact | null, business: Business[], 
        individual: Individual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.source = source;
        this.loan = loan;
        this.payments = payments;
        this.owner = owner;
        this.addressid = addressid;
        this.mortgage = mortgage;
        this.title = title;
        this.agent = agent;
        this.type = type;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactid = contactid;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.mortgagebusiness = business;
        this.mortgageindividual = individual;
    }
}