import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatResponseHandler } from 'src/handlers/formattedResponse';
import { Repository } from 'typeorm';
import { PermissionEntity } from 'src/database/permissions/permission.entity';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(PermissionEntity) private readonly PermissionRepository : Repository<PermissionEntity>){}

    async addPermissionDataHandler(reqBody){
        try {
            let isExist = await this?.PermissionRepository?.findOneBy({slug : reqBody?.slug});

            if(isExist) return formatResponseHandler(reqBody?.alreadyExistMsg, null, 400);

            let newRecordInstance = await this?.PermissionRepository?.create({
                ...reqBody,
                createdAt : new Date()
            })

            let createdRecord = await this.PermissionRepository.save(newRecordInstance);

            if(createdRecord) return formatResponseHandler(reqBody?.createdSuccessfullyMsg, null, 201);

            return formatResponseHandler(reqBody?.errorWhileCreatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getAllPermissionsHandler(reqBody){
        try {
            let fetchedData = await this?.PermissionRepository?.find({order : {createdAt : 'DESC'}, select : ['id', 'name', 'slug', 'isActive']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData, 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getPermissionByIdHandler(reqBody){
        try {
            let fetchedData = await this?.PermissionRepository?.find({where : {id : reqBody?.id}, select : ['id', 'name', 'slug', 'isActive']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData, 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async updatePermissionDataHandler(reqBody){
        try {
            let {id, updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg, ...restUpdateObj} = reqBody;

            let fetchedData = await this?.PermissionRepository?.findOne({where : {id}});

            if(!fetchedData) return formatResponseHandler(notFoundMsg, null, 404);

            let updatedData = await this?.PermissionRepository?.update(reqBody?.id, {
                ...restUpdateObj,
                updatedAt : new Date(),
            }); 

            if(updatedData?.affected != 0) return formatResponseHandler(updatedSuccessfullyMsg, null, 200);

            return formatResponseHandler(errorWhileUpdatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async deletePermissionDataHandler(reqBody){
        try {
            let {id} = reqBody;

            let isExist = await this?.PermissionRepository?.findOneBy({id});

            if(!isExist) return formatResponseHandler(reqBody?.notFoundMsg, null, 404);

            let deletedData = await this?.PermissionRepository?.delete({id});

            if(deletedData?.affected != 0) return formatResponseHandler(reqBody?.deletedSuccessfullyMsg, null, 200);

            return formatResponseHandler(reqBody?.errorWhileDeletingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }
}
