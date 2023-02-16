import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";


@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
    readonly validStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    private isStatusValid(status: any) {
        const statusIndex = this.validStatus.indexOf(status);
        return statusIndex !== -1;
    }

  transform(value: any) {

    value = value.toUpperCase();
    console.log(this.isStatusValid(value))

    if(!this.isStatusValid(value)) {
        throw new BadRequestException(`${value} is not a valid status!`);
        
    }

    return value;
  }
}