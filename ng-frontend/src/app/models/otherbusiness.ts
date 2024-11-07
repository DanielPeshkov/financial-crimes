import { Business } from "./business";
import { OtherReport } from "./otherreport";

export class OtherBusiness {
    id: number | null;
    reportid: number | null;
    businessid: number | null;

    report: OtherReport | null;
    business: Business;

    constructor(id: number | null, reportid: number | null, businessid: number | null, 
        report: OtherReport | null, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}