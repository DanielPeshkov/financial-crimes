import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
