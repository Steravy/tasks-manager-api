import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";


@Entity("user")
@Unique(['userName'])
export class User {

    @PrimaryGeneratedColumn()
    readonly id:number;

    @Column("varchar", { name: "user_name", length: 60 })
    private userName: string;

    @Column("varchar", { name: "password"})
    private password: string;

    @Column("varchar", { name: "salt"})
    private salt: string;

    @OneToMany(() => Task, (task) => task["user"], {eager: true})
    tasks: Task[];

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