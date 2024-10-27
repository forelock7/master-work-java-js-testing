export const envConfig = {
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    host: process.env.HOST || '',
    clientPort: parseInt(process.env.PORT!) || 8080,
    isSSL: process.env.IS_SSL === 'true',
    getClientUrl(): string {
        return this.isSSL ? `https://${this.host}` : `http://${this.host}:${this.clientPort}`;
    },
};
