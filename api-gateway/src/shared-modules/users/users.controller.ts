import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';

const generalService = new GeneralConfigService();
const apiPrefix = generalService.getConfigData('apiPrefix')

@Controller(apiPrefix + '/users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @Post()
    async addUserDataHandler(){
        
    }
}
