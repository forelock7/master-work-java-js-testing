import {envConfig} from "./env.config";

export class UserContext {
    token?: string;

    constructor(
        public username: string = envConfig.username,
        public password: string = envConfig.password,
    ) {
        this.username = username;
        this.password = password;
    }
}