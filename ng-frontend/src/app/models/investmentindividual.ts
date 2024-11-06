import { Individual } from "./individual";
import { InvestmentReport } from "./investmentreport";

export class InvestmentIndividual {
    id: number;
    reportid: number;
    individualid: number;

    report: InvestmentReport;
    individual: Individual;

    constructor(id: number, reportid: number, individualid: number, 
        report: InvestmentReport, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}