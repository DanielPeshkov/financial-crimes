import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "../contact/contact";
import { OtherBusiness } from "src/other-business/other-business";
import { OtherIndividual } from "src/other-individual/other-individual";

@Entity({'name': 'otherreport'})
export class OtherReport {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsString()
    type: string;

    @Column()
    @IsString()
    source: string;

    @Column()
    @IsDate()
    incidentdate: Date;

    @Column()
    @IsBoolean()
    approx: boolean;

    @Column()
    @IsString()
    location: string;

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

    @OneToMany(() => OtherBusiness, bus => bus.report)
    otherbusiness: OtherBusiness[];

    @OneToMany(() => OtherIndividual, ind => ind.report)
    otherindividual: OtherIndividual[];
}
