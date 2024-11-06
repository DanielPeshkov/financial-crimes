import { Business } from "./business";
import { InstitutionReport } from "./institutionreport";


export class InstitutionBusiness {
    id: number;
    reportid: number;
    businessid: number;

    report: InstitutionReport;
    business: Business;

    constructor(id: number, reportid: number, businessid: number, 
        report: InstitutionReport, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}