import { Contact } from "src/contact/contact";
import { InstitutionBusiness } from "src/institution-business/institution-business";
import { InstitutionIndividual } from "src/institution-individual/institution-individual";
export declare class InstitutionReport {
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
}
