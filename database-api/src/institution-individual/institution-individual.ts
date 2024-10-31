import { IsNotEmpty, IsNumber } from "class-validator";
import { Individual } from "src/individual/individual";
import { InstitutionReport } from "src/institution-report/institution-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InstitutionIndividual {

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

    @ManyToOne(() => InstitutionReport, report => report.id)
    @JoinColumn({'name': 'reportid'})
    report: InstitutionReport;

    @ManyToOne(() => Individual, ind => ind.id)
    @JoinColumn({'name': 'individualid'})
    individual: Individual;
}