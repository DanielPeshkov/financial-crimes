import { OtherReport } from 'src/other-report/other-report';
import { DeleteResult, Repository } from 'typeorm';
export declare class OtherReportService {
    private repo;
    constructor(repo: Repository<OtherReport>);
    create(otherReport: OtherReport): Promise<OtherReport>;
    findAll(): Promise<OtherReport[]>;
    findOne(id: number): Promise<OtherReport>;
    update(id: number, data: OtherReport): Promise<OtherReport>;
    remove(id: number): Promise<DeleteResult>;
}
