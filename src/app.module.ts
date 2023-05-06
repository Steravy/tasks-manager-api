import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/TypeOrmConfigService';
import { ConfigModule, ConfigService } from "@nestjs/config";
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
import { JwtStrategy } from './authentication/JwtStrategy';


@Module({

  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      load: [configuration],
      // validationSchema,
      isGlobal: true
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: 3600 },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    TypeOrmModule.forFeature([User, Task]),

  ],

  controllers: [AuthenticationController, TasksController],
  providers: [AuthenticationService, TasksService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]

})
export class AppModule { }
