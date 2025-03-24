import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { addRoleDataPtrn, deleteRoleDataPtrn, getAllRolesPtrn, getRoleByIdPtrn, updateRoleDataPtrn } from '../event-msg-pattern/role.event.msg';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService : RolesService){}

    @MessagePattern({cmd : addRoleDataPtrn})
    async addRoleDataHandler(@Body() reqBody){
        return this.roleService.addRoleDataHandler(reqBody);
    }

    @MessagePattern({cmd : getAllRolesPtrn})
    async getAllRolesHandler(@Body() reqBody){
        return this.roleService.getAllRolesHandler(reqBody);
    }

    @MessagePattern({cmd : getRoleByIdPtrn})
    async getRoleByIdHandler(@Body() reqBody){
        return this.roleService.getRoleByIdHandler(reqBody);
    }

    @MessagePattern({cmd : updateRoleDataPtrn})
    async updateRoleDataHandler(@Body() reqBody){
        return this.roleService.updateRoleDataHandler(reqBody);
    }

    @MessagePattern({cmd : deleteRoleDataPtrn})
    async deleteRoleDataHandler(@Body() reqBody){
        return this.roleService.deleteRoleDataHandler(reqBody);
    }
}
