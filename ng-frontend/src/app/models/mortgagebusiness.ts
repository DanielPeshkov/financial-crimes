import { Business } from "./business";
import { MortgageReport } from "./mortgagereport";

export class MortgageBusiness {
    id: number;
    reportid: number;
    businessid: number;

    report: MortgageReport;
    business: Business;

    constructor(id: number, reportid: number, businessid: number, 
        report: MortgageReport, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}