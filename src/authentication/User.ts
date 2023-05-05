import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity("user")
@Unique(['userName'])
export class User {

    @PrimaryGeneratedColumn()
    private id:number;

    @Column("varchar", { name: "user_name", length: 60 })
    private userName: string;

    @Column("varchar", { name: "password"})
    private password: string;

    @Column("varchar", { name: "salt"})
    private salt: string;

    @CreateDateColumn()
    private createddate: Date;

    @DeleteDateColumn()
    private deletedDate: Date;

    constructor(userName: string, password: string, salt: string) {
        this.userName = userName;
        this.password = password;
        this.salt = salt;
    }

    async validatePassword(password: string): Promise<boolean> {

        return await bcrypt.compare(password, this.password)

    }

    getUserName(): string {
        return this.userName;
    }

}