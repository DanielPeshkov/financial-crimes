import { Business } from "./business";
import { OtherReport } from "./otherreport";

export class OtherBusiness {
    id: number;
    reportid: number;
    businessid: number;

    report: OtherReport;
    business: Business;

    constructor(id: number, reportid: number, businessid: number, 
        report: OtherReport, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}