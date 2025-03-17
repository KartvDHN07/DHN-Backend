import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/users/user.entity';
import { formatResponseHandler } from 'src/handlers/formattedResponse';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository : Repository<UserEntity>){}

    async addUserDataHandler(reqBody){
        try {
            return formatResponseHandler('User Added Successfully', null, 201);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }
}
