import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/authentication/User";
import { Task } from "src/tasks/task.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Programerfor22',
      database: 'task_management',
      entities: [Task, User],//[__dirname + '/../**/*.entity.ts'],
      synchronize: true,
}