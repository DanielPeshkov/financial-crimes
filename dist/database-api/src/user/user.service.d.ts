import { User } from './user';
import { DeleteResult, Repository } from 'typeorm';
export declare class UserService {
    private repo;
    constructor(repo: Repository<User>);
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, data: User): Promise<User>;
    remove(id: number): Promise<DeleteResult>;
}
