import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    private id:number;

    @Column("varchar", { name: "user_name", length: 45 })
    private userName: string;

    @Column("varchar", { name: "password", length: 45 })
    private password: string;


    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }

}