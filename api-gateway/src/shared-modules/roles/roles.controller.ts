import { Body, Controller, Get, Param, Patch, Post, Res, Delete } from '@nestjs/common';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { Cookies } from 'src/handlers/customCookieDecorator';
import { Response } from 'express';
import { RolesService } from './roles.service';
import { CreateRoleDTO, UpdateRoleDTO } from 'src/database/roles/role.dtos';

const generalService = new GeneralConfigService();

const [apiPrefix, sharedServicePrefix] = ([
  generalService.getConfigData('apiPrefix'),
  generalService.getConfigData('sharedService'),
]);

@Controller(apiPrefix + '/' + sharedServicePrefix + '/roles')
export class RolesController {
    constructor(private readonly roleService : RolesService){}

    @Post('add')
    async addRoleDataHandler(@Cookies() Cookies, @Body() reqBody : CreateRoleDTO, @Res() response : Response){
        return this.roleService.addRoleDataHandler(Cookies, response, reqBody);
    }

    @Get('getAll')
    async getAllRolesHandler(@Cookies() Cookies, @Res() response : Response){
        return this.roleService.getAllRolesHandler(Cookies, response);
    }

    @Get('get/:id')
    async getRoleByIdHandler(@Cookies() Cookies, @Param('id') id : string, @Res() response : Response){
      return this.roleService.getRoleByIdHandler(Cookies, id, response);
    }

    @Patch('update/:id')
    async updateRoleDataHandler(@Cookies() Cookies, @Param('id') id : string, @Body() reqBody : UpdateRoleDTO, @Res() response : Response){
      return this.roleService.updateRoleDataHandler(Cookies, id, reqBody, response);
    }

    @Delete('delete/:id')
    async deleteRoleDataHandler(@Cookies() Cookies, @Param('id') id : string, @Res() response : Response){
      return this.roleService.deleteRoleDataHandler(Cookies, id, response);
    }
}
