import { Business } from "./business";
import { MortgageReport } from "./mortgagereport";

export class MortgageBusiness {
    id: number | null;
    reportid: number | null;
    businessid: number | null;

    report: MortgageReport | null;
    business: Business;

    constructor(id: number | null, reportid: number | null, businessid: number | null, 
        report: MortgageReport | null, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}