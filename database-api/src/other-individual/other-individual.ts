import { IsNotEmpty, IsNumber } from "class-validator";
import { Individual } from "src/individual/individual";
import { OtherReport } from "src/other-report/other-report";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OtherIndividual {
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

    @ManyToOne(() => OtherReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: OtherReport;

    @ManyToOne(() => Individual, ind => ind.id)
    @JoinColumn({'name':'individualid'})
    individual: Individual;
}
