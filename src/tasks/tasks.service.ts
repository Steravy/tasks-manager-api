import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksByFilterDto } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // getAllTasks(): Task[] {
  //     return this.tasks;
  // }

  // getTasksByFilters (filterParamsDto: GetTasksByFilterDto): Task[] {

  //     const {search, status} = filterParamsDto;

  //     let tasks = this.getAllTasks();

  //     if(status) {
  //         tasks = tasks.filter( task => task.status === status);
  //     }

  //     if(search) {
  //          tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
  //     }

  //     return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOneBy(<any>{ id: id });

    if (!foundTask) {
      throw new NotFoundException(`Task with ID: ${id} does\`t exists`);
    }
    return foundTask;
  }

 

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {

      const {title, description} = createTaskDto;
      const task = new Task(title, description, TaskStatus.OPEN);

    //   task.title = title;
    //   task.description = description;
    //   task.status = TaskStatus.IN_PROGRESS;

      await this.taskRepository.save(task);


      return task;
  }

  async deleteTask(id: number): Promise<void> {
    const taskToDelete = this.getTaskById(id);
    await this.taskRepository.delete(id);
  }

  // deleteTask(id: string): void {
  //     const taskToDelete = this.getTaskById(id);
  //     this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  // }
}
