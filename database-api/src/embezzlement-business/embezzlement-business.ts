import { IsNotEmpty, IsNumber } from "class-validator";
import { Business } from "src/business/business";
import { EmbezzlementReport } from "src/embezzlement-report/embezzlement-report";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmbezzlementBusiness {

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

    @ManyToOne(() => EmbezzlementReport, report => report.id)
    @JoinColumn({'name':'reportid'})
    report: EmbezzlementReport;

    @ManyToOne(() => Business, bus => bus.id)
    @JoinColumn({'name':'businessid'})
    business: Business;
}