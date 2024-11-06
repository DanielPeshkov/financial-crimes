import { Contact } from "./contact";
import { InvestmentBusiness } from "./investmentbusiness";
import { InvestmentIndividual } from "./investmentindividual";

export class InvestmentReport {
    id: number;
    amount: number;
    loss: number;
	force: boolean;
	promise: string;
	contract: boolean;
	method: string;
	funds: boolean;
	communication: boolean;
	source: string;
	documentation: boolean;
	description: string;
    contactid: number;
    status: number;
    created: Date;
    updated: Date;

    contact: Contact;
    investmentbusiness: InvestmentBusiness[];
    investmentindividual: InvestmentIndividual[];

    constructor(id: number, amount: number, loss: number, 
        force: boolean, promise: string, contract: boolean, method: string,
        funds: boolean, communication: boolean,
        source: string, documentation: boolean, description: string, 
        contactid: number, status: number, created: Date, updated: Date, 
        contact: Contact, business: InvestmentBusiness[], 
        individual: InvestmentIndividual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.loss = loss;
        this.force = force;
        this.promise = promise;
        this.contract = contract;
        this.method = method;
        this.funds = funds;
        this.communication = communication;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactid = contactid;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.investmentbusiness = business;
        this.investmentindividual = individual;
    }
}