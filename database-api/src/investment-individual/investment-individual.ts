import { IsNotEmpty, IsNumber } from "class-validator";
import { Individual } from "src/individual/individual";
import { InvestmentReport } from "src/investment-report/investment-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvestmentIndividual {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    reportid: number;

    @Column()
    @IsNumber()
    individualid: number;

    @ManyToOne(() => InvestmentReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: InvestmentReport;

    @ManyToOne(() => Individual, ind => ind.id)
    @JoinColumn({'name':'individualid'})
    individual: Individual;
}