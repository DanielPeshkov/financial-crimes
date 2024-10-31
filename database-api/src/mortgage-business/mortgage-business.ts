import { IsNotEmpty, IsNumber } from "class-validator";
import { Business } from "src/business/business";
import { MortgageReport } from "src/mortgage-report/mortgage-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MortgageBusiness {

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

    @ManyToOne(() => MortgageReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: MortgageReport;

    @ManyToOne(() => Business, bus => bus.id)
    @JoinColumn({'name':'businessid'})
    business: Business;
}