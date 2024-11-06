import { Individual } from "./individual";
import { OtherReport } from "./otherreport";

export class OtherIndividual {
    id: number;
    reportid: number;
    individualid: number;

    report: OtherReport;
    individual: Individual;

    constructor(id: number, reportid: number, individualid: number, 
        report: OtherReport, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}