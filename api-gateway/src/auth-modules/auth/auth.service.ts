import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/database/users/user.dtos';
import { formattedResponseHandler } from 'src/handlers/formatResponseHandler';
import { GeneralConfigService } from '../general-config/general-config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/users/user.entity';
import { Repository } from 'typeorm';
import { CompleteProfileDTO, OTPVerifyDTO, PasswordVerifyDTO } from 'src/database/auth/auth.dtos';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(private readonly generalConfigService : GeneralConfigService,
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>
    ){}

    async LoginAndSignUpHandler(requestData : CreateUserDTO, response){
        try {

            if(!requestData?.contact && !requestData?.email){
                return formattedResponseHandler(response, null, 400, 'Please provide all the required fields' );
            }

            let medium = 'contact';
            if(requestData?.email){
                medium = 'email';
            }

            let existUser = await this.userRepository?.findOne({where : {[medium] : requestData?.[medium]}});

            if(!existUser){

                let generatedOTP = await this.generalConfigService?.OTPHashGenerater(requestData?.contact || requestData?.email)

                let newUserInstance = this.userRepository.create({
                    [medium] : requestData?.[medium],
                    createdAt : new Date()
                })

                await this.userRepository.save(newUserInstance);

                return formattedResponseHandler(response, {newUser : true, medium, OTP : generatedOTP}, 200, 'OTP Sent Successfully !');
            }

            return formattedResponseHandler(response, {newUser : false, medium}, 200, 'User Already exist !')

        
        } catch (error) {
            return formattedResponseHandler(response, error, 400, null);
        }
    }

    async VerifyOTPHandler(requestData : OTPVerifyDTO, response){
        try {
            if(!requestData?.contact && !requestData?.email){
                return formattedResponseHandler(response, null, 400, 'Please provide all the required fields' );
            }

            let medium = 'contact';
            if(requestData?.email){
                medium = 'email';
            }

            let existUser = await this?.userRepository?.findOne({where : {[medium] : requestData?.[medium]}});

            if(!existUser) return formattedResponseHandler(response, null, 404, 'User Doesn\'t Exist !');

            let generatedOTP = await this.generalConfigService?.OTPHashGenerater(requestData?.[medium]);

            if(requestData?.OTP == generatedOTP){
                return formattedResponseHandler(response, {verified : true, userId : existUser?.id}, 200, 'User Signed In Successfully !' );
            }

            return formattedResponseHandler(response, null, 401, 'Invalid OTP');

        } catch (error) {
            return formattedResponseHandler(response, error, 400, null);
        }
    }

    async VerifyPasswordHandler(requestData : PasswordVerifyDTO, response){
        try {
            if(!requestData?.contact && !requestData?.email){
                return formattedResponseHandler(response, null, 400, 'Please provide all the required fields' );
            }

            let medium = 'contact';
            if(requestData?.email){
                medium = 'email';
            }

            let existUser = await this?.userRepository?.findOne({where : {[medium] : requestData?.[medium]}});

            if(!existUser) return formattedResponseHandler(response, null, 404, 'User Doen\'t Exist !');

            let isPassMatched = await bcrypt.compare(requestData?.password, existUser?.password);

            if(isPassMatched){

                let {accessToken, refreshToken, accessTokenExp, refreshTokenExp} : any = await this?.generalConfigService?.generateAccessAndRefreshJWTToken({id : existUser?.id, name : existUser?.name, contact : existUser?.contact, email : existUser?.email});

                await response.cookie('accessToken', accessToken,  {
                    httpOnly: true, // Prevent client-side JavaScript access
                    secure: true, // Use Secure flag in production
                    sameSite: 'none', // Prevent CSRF attacks
                    maxAge: accessTokenExp // 1 day expiration
                });

                await response.cookie('refreshToken', refreshToken,  {
                    httpOnly: true, // Prevent client-side JavaScript access
                    secure: true, // Use Secure flag in production
                    sameSite: 'none', // Prevent CSRF attacks
                    maxAge: refreshTokenExp, // 1 day expiration
                });

                return formattedResponseHandler(response, {verified : true}, 200, 'User Signed In Successfully !' );
            }

            return formattedResponseHandler(response, null, 401, 'Invalid Password !');

        } catch (error) {
            console.log(error)
            return formattedResponseHandler(response, error, 400, null);
        }
    }

    async UpdateProfileSetup(requestData : CompleteProfileDTO, response){
        try {

            let existUser = await this?.userRepository?.findOne({where : {id : requestData?.id}});

            if(requestData?.password !== requestData?.confirmPassword) return formattedResponseHandler(response, null, 400, 'Passwords Don\'t Match !');

            if(!existUser) return formattedResponseHandler(response, null, 404, 'User Doesn\'t Exist !');

            let hashedPass = await bcrypt.hash(requestData?.password, 10);

            let updatedUser = await this?.userRepository?.update(existUser?.id, {name : requestData?.name, password : hashedPass, updatedAt : new Date()});

            let {accessToken, refreshToken, accessTokenExp, refreshTokenExp} : any = await this?.generalConfigService?.generateAccessAndRefreshJWTToken({id : existUser?.id, name : existUser?.name, contact : existUser?.contact, email : existUser?.email});

            await response.cookie('accessToken', accessToken,  {
                httpOnly: true, // Prevent client-side JavaScript access
                secure: true, // Use Secure flag in production
                sameSite: 'none', // Prevent CSRF attacks
                maxAge: accessTokenExp // 1 day expiration
            });

            await response.cookie('refreshToken', refreshToken,  {
                httpOnly: true, // Prevent client-side JavaScript access
                secure: true, // Use Secure flag in production
                sameSite: 'none', // Prevent CSRF attacks
                maxAge: refreshTokenExp, // 1 day expiration
            });
            
            if(updatedUser?.affected != 0) return formattedResponseHandler(response, null, 200, 'Profile Completion Successfully !');

        } catch (error) {
            return formattedResponseHandler(response, error, 400, null);
        }
    }

}
