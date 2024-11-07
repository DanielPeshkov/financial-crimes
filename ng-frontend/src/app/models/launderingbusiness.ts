import { Business } from "./business";
import { LaunderingReport } from "./launderingreport";

export class LaunderingBusiness {
    id: number | null;
    reportid: number | null;
    businessid: number | null;

    report: LaunderingReport | null;
    business: Business;

    constructor(id: number | null, reportid: number | null, businessid: number | null, 
        report: LaunderingReport | null, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}