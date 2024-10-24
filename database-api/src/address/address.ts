import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    type: string;

    @Column()
    @IsString()
    street: string;

    @Column()
    @IsString()
    street2: string;

    @Column()
    @IsString()
    city: string;

    @Column()
    @IsString()
    state: string;

    @Column()
    @IsNumberString()
    @IsString()
    zip: string;

    @Column()
    @IsString()
    country: string;

    constructor(id: number, type: string, street: string, street2: string, 
                city: string, state: string, zip: string, country: string
    ) {
        this.id = id;
        this.type = type;
        this.street = street;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    }
}
