import { IsNotEmpty, IsNumber } from "class-validator";
import { Individual } from "src/individual/individual";
import { MortgageReport } from "src/mortgage-report/mortgage-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MortgageIndividual {

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

    @ManyToOne(() => MortgageReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: MortgageReport;

    @ManyToOne(() => Individual, ind => ind.id)
    @JoinColumn({'name':'individualid'})
    individual: Individual;
}