import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskStatusValidationPipe } from './custom_pipes/task_status_validation_pipes';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksByFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterParamsDto: GetTasksByFilterDto): Task[] {
    //     console.log(filterParamsDto)

    //    return Object.keys(filterParamsDto).length ? this.tasksService.getTasksByFilters(filterParamsDto) : this.tasksService.getAllTasks(); 
    // }

    // @Get(':id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(
    //     @Body() createTaskDto: CreateTaskDto
    //     ): Task {
    //         return this.tasksService.createTask(createTaskDto);
    // }

    // @Delete(':id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id);
    // }

    // @Patch(':id/status')
    // updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
}
