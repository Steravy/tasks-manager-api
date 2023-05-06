import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./User";
import { JwtPayload } from "./JwtPayload";
import { AuthenticationService } from "./authentication.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(

        private authenticationService: AuthenticationService,
        private configService: ConfigService,

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret')
        });
    }

    async validate(payload?: JwtPayload): Promise<User> {

        const { userName } = payload;

        const user = await this.authenticationService.findUserByUserName(userName);
        
        return user;
    }
}