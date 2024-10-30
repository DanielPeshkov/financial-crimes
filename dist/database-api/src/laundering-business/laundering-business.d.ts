import { Business } from "src/business/business";
import { LaunderingReport } from "src/laundering-report/laundering-report";
export declare class LaunderingBusiness {
    id: number;
    reportid: number;
    businessid: number;
    report: LaunderingReport;
    business: Business;
}
