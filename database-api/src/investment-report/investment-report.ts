import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { Contact } from "src/contact/contact";
import { InvestmentBusiness } from "src/investment-business/investment-business";
import { InvestmentIndividual } from "src/investment-individual/investment-individual";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({'name':'investmentreport'})
export class InvestmentReport {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsNumber()
    loss: number;

    @Column()
    @IsBoolean()
	force: boolean;

    @Column()
    @IsString()
	promise: string;

    @Column()
    @IsBoolean()
	contract: boolean;

    @Column()
    @IsString()
	method: string;

    @Column()
    @IsBoolean()
	funds: boolean;

    @Column()
    @IsBoolean()
	communication: boolean;

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

    @OneToMany(() => InvestmentBusiness, bus => bus.report)
    investmentbusiness: InvestmentBusiness[];

    @OneToMany(() => InvestmentIndividual, ind => ind.report)
    investmentindividual: InvestmentIndividual[];
}