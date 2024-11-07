import { Business } from "./business";
import { Contact } from "./contact";
import { Individual } from "./individual";
import { InvestmentIndividual } from "./investmentindividual";

export class InvestmentReport {
    id: number | null;
    amount: number | null;
    loss: number | null;
	force: boolean | null;
	promise: string | null;
	contract: boolean | null;
	method: string | null;
	funds: boolean | null;
	communication: boolean | null;
	source: string | null;
	documentation: boolean | null;
	description: string | null;
    contactid: number | null;
    status: number | null;
    created: string | null;
    updated: string | null;

    contact: Contact | null;
    investmentbusiness: Business[];
    investmentindividual: InvestmentIndividual[];

    constructor(id: number | null, amount: number | null, loss: number | null, 
        force: boolean | null, promise: string | null, contract: boolean | null, method: string | null,
        funds: boolean | null, communication: boolean | null,
        source: string | null, documentation: boolean | null, description: string | null, 
        contactid: number | null, status: number | null, created: string | null, updated: string | null, 
        contact: Contact | null, business: Business[], 
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