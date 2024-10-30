import { Controller, Get, Post, Delete, Param, HttpCode, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    // @Post()
    // @HttpCode(201)
    // create(@Body() user: User) {
    //     return this.userService.create(user);
    // }

    @MessagePattern({path: 'post/user'})
    create(user) {
        return this.userService.create(user);
    }

    // @Get()
    // @HttpCode(200)
    // findAll(): any {
    //     return this.userService.findAll();
    // }

    @MessagePattern({path: 'get/user'})
    findAll(data: string) {
        return this.userService.findAll();    
    }

    // @Get(':id')
    // @HttpCode(200)
    // findOne(@Param('id') id: string) {
    //     return this.userService.findOne(+id);
    // }

    @MessagePattern({path: 'getById/user'})
    findOne(id: number) {
        return this.userService.findOne(id);
    }

    // @Put(':id')
    // @HttpCode(200)
    // update(@Param('id') id: string, @Body() user: User) {
    //     return this.userService.update(+id, user);
    // }

    @MessagePattern({path: 'putuser'})
    update(payload: any) {
        let {id, body} = payload
        return this.userService.update(+id, body);
    }

    // @Delete(':id')
    // @HttpCode(204)
    // remove(@Param('id') id: string) {
    //     return this.userService.remove(+id);
    // }

    @MessagePattern({path: 'deleteuser'})
    delete(id: number) {
        return this.userService.remove(id);
    }
}
