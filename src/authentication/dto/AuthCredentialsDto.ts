import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthCredentialsDto {

    @ApiProperty()
    @IsString()
    @MinLength(4, {message: 'user name should have at least 4 character!'})
    @MaxLength(20, {message: 'user name should not have more then 20 character!'})
    private userName: string;

    @ApiProperty()
    @IsString()
    @MinLength(4, {message: 'password should have at least 4 character!'})
    @MaxLength(20, {message: 'password should not have more then 20 character!'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak. Try to include uppercase and lowercase letters, special characters and numbers.'})
    private password: string;
    

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }
}