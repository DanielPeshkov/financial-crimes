import { LaunderingReportService } from './laundering-report.service';
import { LaunderingReport } from './laundering-report';
export declare class LaunderingReportController {
    private readonly launderingReportService;
    constructor(launderingReportService: LaunderingReportService);
    create(report: any): Promise<LaunderingReport>;
    findAll(data: string): Promise<LaunderingReport[]>;
    findOne(id: number): Promise<LaunderingReport>;
    update(payload: any): Promise<LaunderingReport>;
    delete(id: number): Promise<DeleteResult>;
}
