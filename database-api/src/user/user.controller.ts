import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @MessagePattern({path: 'post/user'})
    create(user) {
        return this.userService.create(user);
    }

    @MessagePattern({path: 'get/user'})
    findAll(data: string) {
        return this.userService.findAll();    
    }

    @MessagePattern({path: 'getById/user'})
    findOne(id: number) {
        return this.userService.findOne(id);
    }

    @MessagePattern({path: 'putuser'})
    update(payload: any) {
        let {id, body} = payload
        return this.userService.update(+id, body);
    }

    @MessagePattern({path: 'deleteuser'})
    delete(id: number) {
        return this.userService.remove(id);
    }
}
