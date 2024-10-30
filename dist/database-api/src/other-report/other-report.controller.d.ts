import { OtherReportService } from './other-report.service';
export declare class OtherReportController {
    private readonly otherReportService;
    constructor(otherReportService: OtherReportService);
    create(report: any): Promise<OtherReport>;
    findAll(data: string): Promise<OtherReport[]>;
    findOne(id: number): Promise<OtherReport>;
    update(payload: any): Promise<OtherReport>;
    delete(id: number): Promise<DeleteResult>;
}
