import { LaunderingReport } from './laundering-report';
import { DeleteResult, Repository } from 'typeorm';
export declare class LaunderingReportService {
    private repo;
    constructor(repo: Repository<LaunderingReport>);
    create(launderingReport: LaunderingReport): Promise<LaunderingReport>;
    findAll(): Promise<LaunderingReport[]>;
    findOne(id: number): Promise<LaunderingReport>;
    update(id: number, data: LaunderingReport): Promise<LaunderingReport>;
    remove(id: number): Promise<DeleteResult>;
}
