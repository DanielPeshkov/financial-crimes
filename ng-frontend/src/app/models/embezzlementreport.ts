import { Business } from "./business";
import { Contact } from "./contact";
import { EmbezzlementBusiness } from "./embezzlementbusiness";
import { EmbezzlementIndividual } from "./embezzlementindividual";
import { Individual } from "./individual";

export class EmbezzlementReport {
    id: number | null;
    amount: number | null;
	employee: boolean| null;
	type: string | null;
	location: string | null;
	source: string | null;
	documentation: boolean| null;
	description: string| null;
    contactid: number | null;
    status: number | null;
    created: string | null;
    updated: string | null;

    contact: Contact | null;
    embezzlementbusiness: Business[];
    embezzlementindividual: Individual[];

    constructor(id: number | null, amount: number | null, emloyee: boolean| null, type: string| null, 
        location: string| null, source: string| null, documentation: boolean| null, 
        description: string| null, contactid: number | null, status: number | null, created: string | null, 
        updated: string | null, contact: Contact | null, business: Business[], 
        individual: Individual[]
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