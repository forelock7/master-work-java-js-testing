import {Role} from '@constants/role';
import {envConfig} from '@constants/env.config';

export class UserContext {
    token?: string;
    private _baseUrl?: string;

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

    get baseUrl() {
        if (this._baseUrl) {
            return this._baseUrl;
        } else {
            return `${envConfig.getClientUrl()}`;
        }
    }

    set baseUrl(url: string) {
        this._baseUrl = url;
    }
}
