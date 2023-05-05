import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';

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
    signIp(@Body() authCredentialsDto: AuthCredentialsDto){
        return this.authenticationService.signIn(authCredentialsDto);
    }

}
