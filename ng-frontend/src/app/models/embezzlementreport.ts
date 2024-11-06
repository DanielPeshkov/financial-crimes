import { Contact } from "./contact";
import { EmbezzlementBusiness } from "./embezzlementbusiness";
import { EmbezzlementIndividual } from "./embezzlementindividual";

export class EmbezzlementReport {
    id: number;
    amount: number;
	employee: boolean;
	type: string;
	location: string;
	source: string;
	documentation: boolean;
	description: string;
    contactid: number;
    status: number;
    created: Date;
    updated: Date;

    contact: Contact;
    embezzlementbusiness: EmbezzlementBusiness[];
    embezzlementindividual: EmbezzlementIndividual[];

    constructor(id: number, amount: number, emloyee: boolean, type: string, 
        location: string, source: string, documentation: boolean, 
        description: string, contactid: number, status: number, created: Date, 
        updated: Date, contact: Contact, business: EmbezzlementBusiness[], 
        individual: EmbezzlementIndividual[]
    ) {
        this.id = id;
        this.amount = amount;
        this.employee = emloyee;
        this.type = type;
        this.location = location;
        this.source = source;
        this.documentation = documentation;
        this.description = description;
        this.contactid = contactid;
        this.status = status;
        this.created = created;
        this.updated = updated;

        this.contact = contact;
        this.embezzlementbusiness = business;
        this.embezzlementindividual = individual;
    }
}