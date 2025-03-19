import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PermissionsService } from './permissions.service';
import { addPermissionDataPtrn, deletePermissionDataPtrn, getAllPermissionsPtrn, getPermissionByIdPtrn, updatePermissionDataPtrn } from '../event-msg-pattern/permission.event.msg';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionService : PermissionsService){}

    @MessagePattern({cmd : addPermissionDataPtrn})
    async addPermissionDataHandler(@Body() reqBody){
        return this.permissionService.addPermissionDataHandler(reqBody);
    }

    @MessagePattern({cmd : getAllPermissionsPtrn})
    async getAllPermissionsHandler(@Body() reqBody){
        return this.permissionService.getAllPermissionsHandler(reqBody);
    }

    @MessagePattern({cmd : getPermissionByIdPtrn})
    async getPermissionByIdHandler(@Body() reqBody){
        return this.permissionService.getPermissionByIdHandler(reqBody);
    }

    @MessagePattern({cmd : updatePermissionDataPtrn})
    async updatePermissionDataHandler(@Body() reqBody){
        return this.permissionService.updatePermissionDataHandler(reqBody);
    }

    @MessagePattern({cmd : deletePermissionDataPtrn})
    async deletePermissionDataHandler(@Body() reqBody){
        return this.permissionService.deletePermissionDataHandler(reqBody);
    }
}
