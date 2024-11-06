import { Individual } from "./individual";
import { InstitutionReport } from "./institutionreport";

export class InstitutionIndividual {
    id: number;
    reportid: number;
    individualid: number;
    
    report: InstitutionReport;
    individual: Individual;

    constructor(id: number, reportid: number, individualid: number, 
        report: InstitutionReport, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}