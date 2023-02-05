import { TaskStatus } from "../tasks.model";


export class GetTasksByFilterDto {
    status: TaskStatus;
    search: string;

}