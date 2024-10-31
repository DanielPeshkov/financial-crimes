import { IsNotEmpty, IsNumber } from "class-validator";
import { Individual } from "src/individual/individual";
import { LaunderingReport } from "src/laundering-report/laundering-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LaunderingIndividual {

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

    @ManyToOne(() => LaunderingReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: LaunderingReport;

    @ManyToOne(() => Individual, ind => ind.id)
    @JoinColumn({'name':'individualid'})
    individual: Individual;
}