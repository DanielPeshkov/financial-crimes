import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({'name':'users'})
export class User {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsString()
    username: string;

    @Column()
    @IsString()
    role: string;

    // constructor(id: number, username: string, role: string) {
    //     this.id = id;
    //     this.username = username;
    //     this.role = role;
    // }
}
