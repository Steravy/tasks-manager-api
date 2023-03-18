

export class AuthCredentialsDto {

    private userName: string;

    private password: string;

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }
}