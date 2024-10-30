import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "../contact/contact";
import { Address } from "../address/address";

@Entity()
export class Business {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsNumber()
    contactid: number;

    @Column()
    @IsNumber()
    addressid: number;

    @OneToOne(() => Contact, contact => contact.id)
    @JoinColumn({'name':'contactid'})
    contact: Contact;

    @OneToOne(() => Address, address => address.id)
    @JoinColumn({'name':'addressid'})
    address: Address;
}
