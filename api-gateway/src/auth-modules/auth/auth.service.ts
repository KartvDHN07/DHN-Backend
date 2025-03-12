import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/database/users/user.dtos';
import { formattedResponseHandler } from 'src/handlers/formatResponseHandler';
import { GeneralConfigService } from '../general-config/general-config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(private readonly generalConfigService : GeneralConfigService,
        @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>
    ){}

    async SignUpHandler(requestData : CreateUserDTO, response){
        try {

            if(!requestData?.contact && !requestData?.email){
                return formattedResponseHandler(response, null, 400, 'Please provide all the required fields' );
            }

            let generatedOTP = await this.generalConfigService?.OTPHashGenerater(requestData?.contact || requestData?.email)

            let medium = 'contact';
            if(requestData?.email){
                medium = 'email';
            }

            let existUser = await this.userRepository?.findOne({where : {[medium] : requestData?.[medium]}});

            if(!existUser){
                let newUserInstance = this.userRepository.create({
                    [medium] : requestData?.[medium],
                    createdAt : new Date()
                })

                await this.userRepository.save(newUserInstance);
            }

            return formattedResponseHandler(response, {medium, OTP : generatedOTP}, 200, 'OTP Sent Successfully !')
        

        } catch (error) {
            return formattedResponseHandler(response, error, 400, null);
        }
    }
}
