import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import * as bcrypt from 'bcrypt';
import { User } from './User';

@Injectable()
export class AuthenticationService {

    constructor(

        @InjectRepository(User)
        private userRepository: Repository<User>

    ) { }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    private async findUserByUserName(userName: string): Promise<User> {

        const foundUser = await this.userRepository.findOne(<any>{ where: { userName } });

        if (!foundUser) {

            throw new UnauthorizedException(`Invalid Credentials!`);
        }

        return foundUser;
    }

    private async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {

        const user = await this.findUserByUserName(authCredentialsDto.getUserName());

        console.log(user, await user.validatePassword(authCredentialsDto.getPassword()), 'in validate user password');

        return user && await user.validatePassword(authCredentialsDto.getPassword()) ? user.getUserName() : null;

    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(authCredentialsDto.getPassword(), salt);

        const user: User = new User(authCredentialsDto.getUserName(), hashedPassword, salt);

        try {

            await this.userRepository.save(user);

        } catch (error) {

            if (error.code === 'ER_DUP_ENTRY') {

                throw new ConflictException(`Username ${authCredentialsDto.getUserName()} already exists!`);

            } else {

                throw new InternalServerErrorException(error.message);
            }

        }

    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        
        const isUserPasswordValid = await this.validateUserPassword(authCredentialsDto);
        console.log(isUserPasswordValid, 'userPasswordValid');

        if (!isUserPasswordValid) {
            throw new UnauthorizedException(`Invalid Credentials!`);
        }

    }

}
