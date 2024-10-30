import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getDB(req: any): any;
    postDB(req: any, body: any): any;
    putDB(path: any, body: any): any;
    deleteDB(path: any): any;
}
