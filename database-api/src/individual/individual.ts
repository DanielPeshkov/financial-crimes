import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "../address/address";
import { Contact } from "../contact/contact";

@Entity()
export class Individual {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    firstname: string;

    @Column()
    @IsString()
    middlename: string;

    @Column()
    @IsString()
    lastname: string;

    @Column()
    @IsDate()
    birth: Date;

    @Column()
    @IsBoolean()
    approx: boolean;

    @Column()
    @IsNumber()
    age: number;

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

    // constructor(id: number, firstName: string, middleName: string, 
    //             lastName: string, birth: Date, approx: boolean, 
    //             age: number, contactId: number, addressId: number
    // ) {
    //     this.id = id;
    //     this.firstName = firstName;
    //     this.middleName = middleName;
    //     this.lastName = lastName;
    //     this.birth = birth;
    //     this.approx = approx;
    //     this.age = age;
    //     this.contactId = contactId;
    //     this.addressId = addressId;
    // }
}
