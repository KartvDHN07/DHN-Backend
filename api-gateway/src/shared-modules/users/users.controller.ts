import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { Cookies } from 'src/handlers/customCookieDecorator';
import { CreateUserDTO } from 'src/database/users/user.dtos';
import { Response } from 'express';

const generalService = new GeneralConfigService();
const [apiPrefix, sharedServicePrefix] = ([ 
    generalService.getConfigData('apiPrefix'), 
    generalService.getConfigData('sharedService')
]);

@Controller(apiPrefix + '/' + sharedServicePrefix + '/users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @Post('add')
    async addUserDataHandler(@Cookies() Cookies, @Res() response : Response, @Body() reqBody : CreateUserDTO){
        return this.userService.addUserDataHandler(Cookies,response, reqBody);
    }
}
