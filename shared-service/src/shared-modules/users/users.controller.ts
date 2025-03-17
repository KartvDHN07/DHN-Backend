import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { addUserDataPtrn } from '../event-msg-pattern/users.event.msg';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService){}

    @MessagePattern({cmd : addUserDataPtrn})
    async addUserDataHandler(@Body() reqBody){
        return this.usersService.addUserDataHandler(reqBody);
    }
}
