import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatResponseHandler } from 'src/handlers/formattedResponse';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/database/roles/role.entity';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(RoleEntity) private readonly RoleRepository : Repository<RoleEntity>){}

    async addRoleDataHandler(reqBody){
        try {
            let isExist = await this?.RoleRepository?.find({where : {slug : reqBody?.slug}});

            if(isExist && isExist?.length != 0) return formatResponseHandler(reqBody?.alreadyExistMsg, null, 400);

            let newRecordInstance = await this?.RoleRepository?.create({
                ...reqBody,
                createdAt : new Date(),
                permissions : JSON.stringify(reqBody?.permissions ?? {}),
            })

            let newRecord = await this.RoleRepository.save(newRecordInstance);

            if(newRecord) return formatResponseHandler(reqBody?.createdSuccessfullyMsg, null, 201);

            return formatResponseHandler(reqBody?.errorWhileCreatingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getAllRolesHandler(reqBody){
        try {
            let fetchedData = await this?.RoleRepository?.find({order : {createdAt : 'DESC'}, select : ['id', 'name', 'slug', 'isActive', 'permissions']});

            if(fetchedData?.length > 0) return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, fetchedData, 200);

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }

    async getRoleByIdHandler(reqBody){
        try {
            let fetchedData : any = await this?.RoleRepository?.find({where : {id : reqBody?.id}, select : ['id', 'name', 'slug', 'isActive', 'permissions']});

            if(fetchedData?.length > 0){
                let data = fetchedData[0];
                data.permissions = JSON.parse(data.permissions);
                return formatResponseHandler(reqBody?.dataFetchedSuccessfullyMsg, data, 200);
            }

            return formatResponseHandler(reqBody?.notFoundMsg, null, 404);
        } catch (error) {
            console.log(error)
            return formatResponseHandler(error, null, 400);
        }
    }

    async updateRoleDataHandler(reqBody){
        try {
            let {id, updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg, ...restUpdateObj} = reqBody;

            let fetchedData = await this?.RoleRepository?.findOne({where : {id}});

            if(!fetchedData) return formatResponseHandler(notFoundMsg, null, 404);

            let updatedData = await this?.RoleRepository?.update(reqBody?.id, {
                ...restUpdateObj,
                updatedAt : new Date(),
                permissions : JSON.stringify(restUpdateObj?.permissions ?? {})
            }); 

            if(updatedData?.affected != 0) return formatResponseHandler(updatedSuccessfullyMsg, null, 200);

            return formatResponseHandler(errorWhileUpdatingMsg, null, 400);
        } catch (error) {
            console.log(error)
            return formatResponseHandler(error, error, 400);
        }
    }

    async deleteRoleDataHandler(reqBody){
        try {
            let {id} = reqBody;

            let isExist = await this?.RoleRepository?.findOneBy({id});

            if(!isExist) return formatResponseHandler(reqBody?.notFoundMsg, null, 404);

            let deletedData = await this?.RoleRepository?.delete({id});

            if(deletedData?.affected != 0) return formatResponseHandler(reqBody?.deletedSuccessfullyMsg, null, 200);

            return formatResponseHandler(reqBody?.errorWhileDeletingMsg, null, 400);
        } catch (error) {
            return formatResponseHandler(error, null, 400);
        }
    }
}
