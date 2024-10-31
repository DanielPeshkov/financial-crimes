import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { Contact } from "src/contact/contact";
import { EmbezzlementBusiness } from "src/embezzlement-business/embezzlement-business";
import { EmbezzlementIndividual } from "src/embezzlement-individual/embezzlement-individual";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({'name':'embezzlementreport'})
export class EmbezzlementReport {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsBoolean()
	employee: boolean;

    @Column()
    @IsString()
	type: string;

    @Column()
    @IsString()
	location: string;

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
    contactId: number;

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

    @OneToMany(() => EmbezzlementBusiness, bus => bus.report)
    embezzlementbusiness: EmbezzlementBusiness[];

    @OneToMany(() => EmbezzlementIndividual, ind => ind.report)
    embezzlementindividual: EmbezzlementIndividual[];
}