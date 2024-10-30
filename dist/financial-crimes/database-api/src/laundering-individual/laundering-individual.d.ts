import { Individual } from "src/individual/individual";
import { LaunderingReport } from "src/laundering-report/laundering-report";
export declare class LaunderingIndividual {
    id: number;
    reportid: number;
    individualid: number;
    report: LaunderingReport;
    individual: Individual;
}
