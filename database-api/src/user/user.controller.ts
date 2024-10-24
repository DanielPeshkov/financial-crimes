import { Controller, Get, Post, Delete, Param, HttpCode, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    @HttpCode(201)
    create(@Body() user: User) {
        return this.userService.create(user);
    }

    @Get()
    @HttpCode(200)
    findAll(): any {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Put(':id')
    @HttpCode(200)
    update(@Param('id') id: string, @Body() user: User) {
        return this.userService.update(+id, user);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
