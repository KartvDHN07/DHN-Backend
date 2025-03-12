import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GeneralConfigService } from '../general-config/general-config.service';
import { Response } from 'express';
import { CreateUserDTO } from 'src/database/users/user.dtos';
import { CompleteProfileDTO, OTPVerifyDTO, PasswordVerifyDTO } from 'src/database/auth/auth.dtos';

const genralService = new GeneralConfigService();

@Controller(genralService.getConfigData('apiPrefix') + '/auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ) {}

    @Post('signin/signup')
    async LoginAndSignUpHandler(@Body() requestData : CreateUserDTO, @Res() res : Response){
        return this.authService.LoginAndSignUpHandler(requestData, res);
    }

    @Post('verify/otp')
    async VerifyOTPHandler(@Body() requestData : OTPVerifyDTO, @Res() res : Response){
        return this.authService.VerifyOTPHandler(requestData, res)
    }

    @Post('verify/password')
    async VerifyPasswordHandler(@Body() requestData : PasswordVerifyDTO, @Res() res : Response){
        return this.authService.VerifyPasswordHandler(requestData, res)
    }

    @Post('complete/profile')
    async UpdateProfileSetup(@Body() requestData : CompleteProfileDTO, @Res() res : Response){
        return this.authService.UpdateProfileSetup(requestData, res)
    }
}
