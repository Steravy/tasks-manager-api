import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "title", length: 45 })
    title: string;

    @Column("varchar", { name: "description", length: 45 })
    description: string;

    @Column("varchar", { name: "status", length: 45 })
    status: TaskStatus;

    @CreateDateColumn()
    createddate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    constructor (title: string, description: string, status: TaskStatus) {
        this.title = title;
        this.description = description;
        this.status = status;

    }

}