import { Individual } from "./individual";
import { MortgageReport } from "./mortgagereport";

export class MortgageIndividual {
    id: number;
    reportid: number;
    individualid: number;

    report: MortgageReport;
    individual: Individual;

    constructor(id: number, reportid: number, individualid: number, 
        report: MortgageReport, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}