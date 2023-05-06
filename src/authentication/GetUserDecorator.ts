import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./User";

export const GetUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
)