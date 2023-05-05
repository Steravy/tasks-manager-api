import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get("DATABASE_HOST"),
      port: this.configService.get("DATABASE_PORT"),
      username: this.configService.get("DATABASE_USER"),
      password: this.configService.get("DATABASE_PASSWORD"),
      database: this.configService.get("DATABASE_SCHEMA"),
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
      namingStrategy: new SnakeNamingStrategy()
    };
  }
}
