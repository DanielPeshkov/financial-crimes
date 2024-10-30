import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { Business } from "src/business/business";
import { LaunderingReport } from "src/laundering-report/laundering-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LaunderingBusiness {

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

    @ManyToOne(() => LaunderingReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: LaunderingReport;

    @ManyToOne(() => Business, bus => bus.id)
    @JoinColumn({'name':'businessid'})
    business: Business;
}