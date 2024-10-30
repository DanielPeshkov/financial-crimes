import { InstitutionReport } from './institution-report';
import { DeleteResult, Repository } from 'typeorm';
export declare class InstitutionReportService {
    private repo;
    constructor(repo: Repository<InstitutionReport>);
    create(institutionReport: InstitutionReport): Promise<InstitutionReport>;
    findAll(): Promise<InstitutionReport[]>;
    findOne(id: number): Promise<InstitutionReport>;
    update(id: number, data: InstitutionReport): Promise<InstitutionReport>;
    remove(id: number): Promise<DeleteResult>;
}
