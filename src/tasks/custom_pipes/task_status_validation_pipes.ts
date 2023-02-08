import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";


@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
    readonly validStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

  transform(value: any) {

    return value;
  }
}