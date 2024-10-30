import { InstitutionReportService } from './institution-report.service';
import { InstitutionReport } from './institution-report';
export declare class InstitutionReportController {
    private readonly institutionReportService;
    constructor(institutionReportService: InstitutionReportService);
    create(report: any): Promise<InstitutionReport>;
    findAll(data: string): Promise<InstitutionReport[]>;
    findOne(id: number): Promise<InstitutionReport>;
    update(payload: any): Promise<InstitutionReport>;
    delete(id: number): Promise<DeleteResult>;
}
