import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksByFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksByFilters (filterParamsDto: GetTasksByFilterDto): Task[] {

        const {search, status} = filterParamsDto;

        let tasks = this.getAllTasks();
        
        if(status) {
            tasks = tasks.filter( task => task.status === status);
        }

        if(search) {
             tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        
        return tasks;
    }

    getTaskById(id: string): Task {
       const foundTask = this.tasks.find(task => task.id === id);

       if (!foundTask) {
        throw new NotFoundException(`Task with ID "${id}" does\`t exists`);
       }

       return foundTask; 

    }

    createTask(createTaskDto: CreateTaskDto): Task {

        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    deleteTask(id: string): void {
        const taskToDelete = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
