import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private id:number;

    @Column()
    private userName: string;

    @Column()
    private password: string;


    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }

}