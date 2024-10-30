import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    phone: string;

    @Column()
    @IsString()
    email: string;

    constructor(id: number, phone: string, email: string) {
        this.id = id;
        this.phone = phone;
        this.email = email;
    }
}