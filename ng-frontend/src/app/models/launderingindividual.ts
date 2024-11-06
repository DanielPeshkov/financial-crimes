import { LaunderingReport } from "./launderingreport";
import { Individual } from "./individual";

export class LaunderingIndividual {
    id: number;
    reportid: number;
    individualid: number;

    report: LaunderingReport;
    individual: Individual;

    constructor(id: number, reportid: number, individualid: number, 
        report: LaunderingReport, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}