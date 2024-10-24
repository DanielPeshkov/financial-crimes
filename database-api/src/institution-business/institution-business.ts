import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { Business } from "src/business/business";
import { InstitutionReport } from "src/institution-report/institution-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InstitutionBusiness {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    reportid: number;

    @Column()
    @IsNumber()
    businessid: number;

    @ManyToOne(() => InstitutionReport, report => report.id)
    @JoinColumn({'name': 'reportid'})
    report: InstitutionReport;

    @ManyToOne(() => Business, bus => bus.id)
    @JoinColumn({'name': 'businessid'})
    business: Business;
}