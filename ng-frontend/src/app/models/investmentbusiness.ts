import { Business } from "./business";
import { InvestmentReport } from "./investmentreport";

export class InvestmentBusiness {
    id: number;
    reportid: number;
    businessid: number;

    report: InvestmentReport;
    business: Business;

    constructor(id: number, reportid: number, businessid: number, 
        report: InvestmentReport, business: Business
    ) {
        this.id = id;
        this.reportid = reportid;
        this.businessid = businessid;

        this.report = report;
        this.business = business;
    }
}