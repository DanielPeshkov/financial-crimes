import { EmbezzlementReport } from "./embezzlementreport";
import { Individual } from "./individual";

export class EmbezzlementIndividual {
    id: number;
    reportid: number;
    individualid: number;

    report: EmbezzlementReport;
    individual: Individual;

    constructor(id: number, reportid: number, individualid: number, 
        report: EmbezzlementReport, individual: Individual
    ) {
        this.id = id;
        this.reportid = reportid;
        this.individualid = individualid;
        this.report = report;
        this.individual = individual;
    }
}