import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {

  transform(value: any) {

    return value;
  }
}