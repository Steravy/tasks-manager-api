import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/authentication/User";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column("varchar", { name: "title", length: 45 })
    private title: string;

    @Column("varchar", { name: "description", length: 500 })
    private description: string;

    @Column("varchar", { name: "status", length: 45 })
    private status: TaskStatus;

    @ManyToOne(() => User, (user) => user.tasks, {eager: false})
    user: User;

    @Column()
    readonly userId: number;

    @CreateDateColumn()
    readonly createddate: Date;

    @DeleteDateColumn()
    readonly deletedDate: Date;

    constructor (title: string, description: string, status: TaskStatus, user: User) {

        this.title = title;
        this.description = description;
        this.status = status;
        this.user = user;

    }

    update(title: string, description: string): void {
        this.title = title;
        this.description = description;
    }

    setStatus(status: TaskStatus): void {
        this.status = status;
    }

}