import { Business } from "./business";
import { LaunderingReport } from "./launderingreport";

export class LaunderingBusiness {
    id: number;
    reportid: number;
    businessid: number;

    report: LaunderingReport;
    business: Business;

    constructor(id: number, reportid: number, businessid: number, 
        report: LaunderingReport, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}