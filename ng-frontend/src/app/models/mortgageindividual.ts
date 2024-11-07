import { Individual } from "./individual";
import { MortgageReport } from "./mortgagereport";

export class MortgageIndividual {
    id: number | null;
    reportid: number | null;
    individualid: number | null;

    report: MortgageReport | null;
    individual: Individual;

    constructor(id: number | null, reportid: number | null, individualid: number | null, 
        report: MortgageReport | null, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}