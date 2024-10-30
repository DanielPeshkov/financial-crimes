import { Individual } from "src/individual/individual";
import { InstitutionReport } from "src/institution-report/institution-report";
export declare class InstitutionIndividual {
    id: number;
    reportid: number;
    individualid: number;
    report: InstitutionReport;
    individual: Individual;
}
