import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatorEntity } from 'src/database/creators/creator.entity';
import { formatResponseHandler } from 'src/handlers/formattedResponse';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreatorsService {
    constructor(@InjectRepository(CreatorEntity) private readonly creatorRepository : Repository<CreatorEntity>){}

    async addCreatorDataHandler(reqBody){
        try {
            let isExist = await this?.creatorRepository?.findOneBy({email : reqBody?.email});

            if(isExist) return formatResponseHandler(reqBody?.alreadyExistMsg, null, 400);

            let hashedPassword = await bcrypt.hash(reqBody?.password, 10);

            let newRecordInstance = await this?.creatorRepository?.create({
                ...reqBody,
                password : hashedPassword,
                createdAt : new Date()
            })

            let createdRecord = await this.creatorRepository.save(newRecordInstance);

            if(createdRecord) return formatResponseHandler(reqBody?.createdSuccessfullyMsg, null, 201);

            return formatResponseHandler(reqBody?.errorWhileCreatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getAllCreatorsHandler(reqBody){
        try {
            let fetchedData = await this?.creatorRepository?.find({order : {createdAt : 'DESC'}, select : ['id', 'name', 'email', 'contact']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData, 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getCreatorByIdHandler(reqBody){
        try {
            let fetchedData = await this?.creatorRepository?.find({where : {id : reqBody?.id}, select : ['id', 'name', 'email', 'contact'], relations : ['role']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData, 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async updateCreatorDataHandler(reqBody){
        try {
            let {id, updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg, ...restUpdateObj} = reqBody;

            let fetchedData = await this?.creatorRepository?.findOne({where : {id}});

            if(!fetchedData) return formatResponseHandler(notFoundMsg, null, 404);

            let hashedPassword : any = null;
            
            if(reqBody?.password){
                hashedPassword = await bcrypt.hash(reqBody?.password, 10);
            }

            let updatedData = await this?.creatorRepository?.update(reqBody?.id, {
                ...restUpdateObj,
                updatedAt : new Date(),
                password : hashedPassword ?? fetchedData?.password
            }); 

            if(updatedData?.affected != 0) return formatResponseHandler(updatedSuccessfullyMsg, null, 200);

            return formatResponseHandler(errorWhileUpdatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async deleteCreatorDataHandler(reqBody){
        try {
            let {id} = reqBody;

            let isExist = await this?.creatorRepository?.findOneBy({id});

            if(!isExist) return formatResponseHandler(reqBody?.notFoundMsg, null, 404);

            let deletedData = await this?.creatorRepository?.delete({id});

            if(deletedData?.affected != 0) return formatResponseHandler(reqBody?.deletedSuccessfullyMsg, null, 200);

            return formatResponseHandler(reqBody?.errorWhileDeletingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }
}
