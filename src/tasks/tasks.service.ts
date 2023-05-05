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
  ) { }

  async getTasks(filterParamsDto: GetTasksByFilterDto): Promise<Task[]> {
    const { status, search } = filterParamsDto;

    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (search) {
      queryBuilder.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    const allTasks = await queryBuilder.getMany()

    return allTasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOneBy(<any>{ id: id });

    if (!foundTask) {
      throw new NotFoundException(`Task with ID: ${id} does\`t exists`);
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task(title, description, TaskStatus.OPEN);

    await this.taskRepository.save(task);

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const wasDeleted = await this.taskRepository.delete(id);
    console.log(wasDeleted);
    console.log('______________________');
    console.log(wasDeleted.affected);


    if (wasDeleted.affected === 0) {
      throw new NotFoundException(`Task with ID: ${id} does\`t exists`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const taskToUpdate = await this.getTaskById(id);
    taskToUpdate.status = status;
    await this.taskRepository.save(taskToUpdate);

    return taskToUpdate;
  }

}
