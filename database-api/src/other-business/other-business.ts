import { IsNotEmpty, IsNumber } from "class-validator";
import { Business } from "src/business/business";
import { OtherReport } from "src/other-report/other-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OtherBusiness {

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

    @ManyToOne(() => OtherReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: OtherReport;

    @ManyToOne(() => Business, bus => bus.id)
    @JoinColumn({'name':'businessid'})
    business: Business;
}