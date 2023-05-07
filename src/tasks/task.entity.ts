import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/authentication/User";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "title", length: 45 })
    title: string;

    @Column("varchar", { name: "description", length: 500 })
    description: string;

    @Column("varchar", { name: "status", length: 45 })
    status: TaskStatus;

    @ManyToOne(() => User, (user) => user.tasks, {eager: false})
    user: User;

    @Column()
    userId: number;

    @CreateDateColumn()
    createddate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    constructor (title: string, description: string, status: TaskStatus, user: User) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.user = user;

    }

}