import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/TypeOrmConfigService';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthenticationModule } from './authentication/authentication.module';
import { configuration } from './config/configurations';
import { User } from './authentication/User';
import { Task } from './tasks/task.entity';
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication/authentication.controller';
import { TasksController } from './tasks/tasks.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TasksService } from './tasks/tasks.service';


@Module({

  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: 3600 },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      load: [configuration],
      // validationSchema,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    TypeOrmModule.forFeature([User, Task]),

    // TasksModule,
    // AuthenticationModule
  ],

  controllers: [AuthenticationController, TasksController],
  providers: [AuthenticationService, TasksService],

})
export class AppModule { }
