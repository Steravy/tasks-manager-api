import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";


export class UpdateTaskDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly description: string;

}