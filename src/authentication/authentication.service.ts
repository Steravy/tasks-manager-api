import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import { User } from './User';

@Injectable()
export class AuthenticationService {
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

        const user: User = new User(authCredentialsDto.getUserName(), authCredentialsDto.getPassword());

        await this.userRepository.save(user);
    }
}
