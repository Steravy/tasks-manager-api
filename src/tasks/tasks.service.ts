import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksByFilterDto } from './dto/get-tasks-filter-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/authentication/User';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async getTasks(filterParamsDto: GetTasksByFilterDto, user: User): Promise<Task[]> {

    const { status, search } = filterParamsDto;
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    queryBuilder.where('task.userId = :userId', { userId: user.id });

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (search) {
      queryBuilder.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    const allTasks = await queryBuilder.getMany()

    return allTasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {

    const foundTask = await this.taskRepository.findOne({ where: { userId: user.id, id } });

    if (!foundTask) {
      throw new NotFoundException(`Task with ID: ${id} does\`t exists`);
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {

    const { title, description } = createTaskDto;
    const task = new Task(title, description, TaskStatus.OPEN, user);

    await this.taskRepository.save(task);
    delete task.user; // improve this one by converting this to a class with only the properties we need

    return task;
  }

  async updateTask(id: number, user: User, updateTaskDto: UpdateTaskDto): Promise<Task> {

    const taskToUpdate = await this.getTaskById(id, user);

    taskToUpdate.update(updateTaskDto.title, updateTaskDto.description);

    await this.taskRepository.save(taskToUpdate);

    return taskToUpdate;

  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {

    const taskToUpdateStatus = await this.getTaskById(id, user);
    taskToUpdateStatus.setStatus(status);
    await this.taskRepository.save(taskToUpdateStatus);

    return taskToUpdateStatus;

  }

  async deleteTask(id: number, user: User): Promise<void> {

    const wasDeleted = await this.taskRepository.softDelete({ id, userId: user.id });
    console.log(wasDeleted);
    console.log('______________________');
    console.log(wasDeleted.affected);


    if (wasDeleted.affected === 0) {
      throw new NotFoundException(`Task with ID: ${id} does\`t exists`);
    }
  }

}
