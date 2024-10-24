import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { Contact } from "src/contact/contact";
import { InstitutionBusiness } from "src/institution-business/institution-business";
import { InstitutionIndividual } from "src/institution-individual/institution-individual";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({'name': 'institutionreport'})
export class InstitutionReport {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    amount: number;

    @Column()
    @IsString()
    institution: string;

    @Column()
    @IsDate()
    incidentdate: Date;

    @Column()
    @IsBoolean()
    approx: boolean;

    @Column()
    @IsString()
    method: string;

    @Column()
    @IsBoolean()
    employee: boolean;

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

    @OneToMany(() => InstitutionBusiness, bus => bus.report)
    institutionbusiness: InstitutionBusiness[];

    @OneToMany(() => InstitutionIndividual, ind => ind.report)
    institutionindividual: InstitutionIndividual[];
}