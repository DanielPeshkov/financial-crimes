import { LaunderingReport } from "./launderingreport";
import { Individual } from "./individual";

export class LaunderingIndividual {
    id: number | null;
    reportid: number | null;
    individualid: number | null;

    report: LaunderingReport | null;
    individual: Individual;

    constructor(id: number | null, reportid: number | null, individualid: number | null, 
        report: LaunderingReport | null, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}