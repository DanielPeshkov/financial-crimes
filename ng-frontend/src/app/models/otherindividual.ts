import { Individual } from "./individual";
import { OtherReport } from "./otherreport";

export class OtherIndividual {
    id: number | null;
    reportid: number | null;
    individualid: number | null;

    report: OtherReport | null;
    individual: Individual;

    constructor(id: number | null, reportid: number | null, individualid: number | null, 
        report: OtherReport | null, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}