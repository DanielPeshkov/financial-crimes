import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { Contact } from "src/contact/contact";
import { MortgageBusiness } from "src/mortgage-business/mortgage-business";
import { MortgageIndividual } from "src/mortgage-individual/mortgage-individual";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({'name':'mortgagereport'})
export class MortgageReport {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsNumber()
	loan: number;

    @Column()
    @IsBoolean()
	payments: boolean;

    @Column()
    @IsString()
	owner: string;

    @Column()
    @IsNumber()
	addressid: number;

    @Column()
    @IsString()
	mortgage: string;

    @Column()
    @IsString()
	title: string;

    @Column()
    @IsString()
	agent: string;

    @Column()
    @IsString()
	type: string;

    @Column()
    @IsString()
	source: string;

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

    @OneToMany(() => MortgageBusiness, bus => bus.report)
    mortgagebusiness: MortgageBusiness[];

    @OneToMany(() => MortgageIndividual, ind => ind.report)
    mortgageindividual: MortgageIndividual[];
}