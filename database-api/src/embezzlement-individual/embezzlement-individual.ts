import { IsNotEmpty, IsNumber } from "class-validator";
import { Individual } from "src/individual/individual";
import { EmbezzlementReport } from "src/embezzlement-report/embezzlement-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmbezzlementIndividual {

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

    @ManyToOne(() => EmbezzlementReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: EmbezzlementReport;

    @ManyToOne(() => Individual, ind => ind.id)
    @JoinColumn({'name':'individualid'})
    individual: Individual;
}