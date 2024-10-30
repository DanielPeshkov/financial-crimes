import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private client;
    constructor(client: ClientProxy);
    getDB(path: string): any;
    postDB(path: string, body: any): any;
    putDB(path: string, id: string, body: any): any;
    deleteDB(path: string, id: string): any;
}
