import { Contact } from "./contact";
import { MortgageBusiness } from "./mortgagebusiness";
import { MortgageIndividual } from "./mortgageindividual";

export class MortgageReport {
    id: number;
    amount: number;
	loan: number;
	payments: boolean;
	owner: string;
	addressid: number;
	mortgage: string;
	title: string;
	agent: string;
	type: string;
	source: string;
	documentation: boolean;
	description: string;
    contactid: number;
    status: number;
    created: Date;
    updated: Date;

    contact: Contact;
    mortgagebusiness: MortgageBusiness[];
    mortgageindividual: MortgageIndividual[];

    constructor(id: number, amount: number, loan: number, payments: boolean, 
        owner: string, addressid: number, mortgage: string, title: string, 
        agent: string, type: string, source: string, documentation: boolean, 
        description: string, contactid: number, status: number, created: Date, 
        updated: Date, contact: Contact, business: MortgageBusiness[], 
        individual: MortgageIndividual[]
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