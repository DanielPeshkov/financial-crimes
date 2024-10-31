import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { Contact } from "src/contact/contact";
import { LaunderingBusiness } from "src/laundering-business/laundering-business";
import { LaunderingIndividual } from "src/laundering-individual/laundering-individual";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({'name':'launderingreport'})
export class LaunderingReport {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsString()
    source: string;

    @Column()
    @IsString()
    method: string;

    @Column()
    @IsString()
    processing: string;

    @Column()
    @IsString()
    location: string;

    @Column()
    @IsDate()
    incidentdate: Date;

    @Column()
    @IsBoolean()
    approx: boolean;

    @Column()
    @IsString()
    organized: string;

    @Column()
    @IsBoolean()
    documentation: boolean;

    @Column()
    @IsString()
    description: string;

    @Column()
    @IsNumber()
    contactid: number;

    @Column()
    @IsNumber()
    status: number;

    @Column()
    @IsDate()
    created: Date;

    @Column()
    @IsDate()
    updated: Date;

    @OneToOne(() => Contact, contact => contact.id)
    @JoinColumn({'name':'contactid'})
    contact: Contact;

    @OneToMany(() => LaunderingBusiness, bus => bus.report)
    launderingbusiness: LaunderingBusiness[];

    @OneToMany(() => LaunderingIndividual, ind => ind.report)
    launderingindividual: LaunderingIndividual[];
}
