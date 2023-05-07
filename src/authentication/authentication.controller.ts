import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './GetUserDecorator';
import { User } from './User';

@ApiTags("auth")
@Controller('auth')
export class AuthenticationController {

    constructor(
        private authenticationService: AuthenticationService
    ) {}
    
    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authenticationService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authenticationService.signIn(authCredentialsDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: User) {
        
    //     console.log(user);
    // }

}
