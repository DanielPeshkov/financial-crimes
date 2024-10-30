import { UserService } from './user.service';
import { User } from './user';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: any): Promise<User>;
    findAll(data: string): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(payload: any): Promise<User>;
    delete(id: number): Promise<DeleteResult>;
}
