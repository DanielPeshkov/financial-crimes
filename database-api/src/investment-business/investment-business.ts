import { IsNotEmpty, IsNumber } from "class-validator";
import { Business } from "src/business/business";
import { InvestmentReport } from "src/investment-report/investment-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvestmentBusiness {

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

    @ManyToOne(() => InvestmentReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: InvestmentReport;

    @ManyToOne(() => Business, bus => bus.id)
    @JoinColumn({'name':'businessid'})
    business: Business;
}