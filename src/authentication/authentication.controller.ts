import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';

@Controller('auth')
export class AuthenticationController {

    constructor(
        private authenticationService: AuthenticationService
    ) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        console.log(authCredentialsDto);
        return this.authenticationService.signUp(authCredentialsDto);
    }
}
