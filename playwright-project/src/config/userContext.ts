import { Role } from '@constants/role';

export class UserContext {
    token?: string;

    constructor(
        public username: string,
        public password: string,
        public role: Role = Role.ADMIN,
        public email: string = username,
    ) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
    }
}
