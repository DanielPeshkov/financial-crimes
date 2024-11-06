import { Business } from "./business";
import { EmbezzlementReport } from "./embezzlementreport";

export class EmbezzlementBusiness {
    id: number;
    reportid: number;
    businessid: number;

    report: EmbezzlementReport;
    business: Business;

    constructor(id: number, reportid: number, businessid: number, 
        report: EmbezzlementReport, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}