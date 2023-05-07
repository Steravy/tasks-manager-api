import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskStatusValidationPipe } from './custom_pipes/task_status_validation_pipes';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksByFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/authentication/GetUserDecorator';
import { User } from 'src/authentication/User';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@ApiTags("tasks")
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@GetUser() user: User, @Query(ValidationPipe) filterParamsDto: GetTasksByFilterDto) {
    return this.tasksService.getTasks(filterParamsDto, user);
  }

  @Get(':id')
  getTaskById(@GetUser() user: User, @Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('in create controller');
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch(':id')
  updateTask(@GetUser() user: User, @Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {

    return this.tasksService.updateTask(id, user, updateTaskDto);

  }

  @Patch(':id/status')
  updateTaskStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {

    return this.tasksService.updateTaskStatus(id, status, user);

  }

  @Delete(':id')
  deleteTask(@GetUser() user: User, @Param('id', ParseIntPipe) id: number): Promise<void> {

    return this.tasksService.deleteTask(id, user);

  }
}
