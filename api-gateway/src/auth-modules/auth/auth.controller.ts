import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GeneralConfigService } from '../general-config/general-config.service';
import { Response } from 'express';
import { CreateUserDTO } from 'src/database/users/user.dtos';

const genralService = new GeneralConfigService();

@Controller(genralService.getConfigData('apiPrefix') + '/auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ) {}

    @Post('signup')
    async SignUpHandler(@Body() requestData : CreateUserDTO, @Res() res : Response){
        return this.authService.SignUpHandler(requestData, res);
    }
}
