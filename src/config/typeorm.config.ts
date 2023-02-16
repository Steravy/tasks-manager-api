import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/task.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Programerfor22',
      database: 'taskmanagement',
      entities: [Task],//[__dirname + '/../**/*.entity.ts'],
      synchronize: true,
}