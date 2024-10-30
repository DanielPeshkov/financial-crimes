import { Contact } from "../contact/contact";
import { OtherBusiness } from "src/other-business/other-business";
import { OtherIndividual } from "src/other-individual/other-individual";
export declare class OtherReport {
    id: number;
    amount: number;
    type: string;
    source: string;
    incidentdate: Date;
    approx: boolean;
    location: string;
    documentation: boolean;
    description: string;
    contactid: number;
    status: number;
    created: Date;
    updated: Date;
    contact: Contact;
    otherbusiness: OtherBusiness[];
    otherindividual: OtherIndividual[];
}
