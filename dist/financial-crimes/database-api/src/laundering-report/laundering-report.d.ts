import { Contact } from "src/contact/contact";
import { LaunderingBusiness } from "src/laundering-business/laundering-business";
import { LaunderingIndividual } from "src/laundering-individual/laundering-individual";
export declare class LaunderingReport {
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
    contact: Contact;
    launderingbusiness: LaunderingBusiness[];
    launderingindividual: LaunderingIndividual[];
}
