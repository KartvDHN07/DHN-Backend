import { Body, Controller, Get, Param, Patch, Post, Res, Delete } from '@nestjs/common';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { Cookies } from 'src/handlers/customCookieDecorator';
import { Response } from 'express';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDTO, UpdatePermissionDTO } from 'src/database/permissions/permission.dtos';

const generalService = new GeneralConfigService();

const [apiPrefix, sharedServicePrefix] = ([
  generalService.getConfigData('apiPrefix'),
  generalService.getConfigData('sharedService'),
]);

@Controller(apiPrefix + '/' + sharedServicePrefix + '/permissions')
export class PermissionsController {
    constructor(private readonly permissionService : PermissionsService){}

    @Post('add')
    async addPermissionDataHandler(@Cookies() Cookies, @Body() reqBody : CreatePermissionDTO, @Res() response : Response){
        return this.permissionService.addPermissionDataHandler(Cookies, response, reqBody);
    }

    @Get('getAll')
    async getAllPermissionsHandler(@Cookies() Cookies, @Res() response : Response){
        return this.permissionService.getAllPermissionsHandler(Cookies, response);
    }

    @Get('get/:id')
    async getPermissionByIdHandler(@Cookies() Cookies, @Param('id') id : string, @Res() response : Response){
      return this.permissionService.getPermissionByIdHandler(Cookies, id, response);
    }

    @Patch('update/:id')
    async updatePermissionDataHandler(@Cookies() Cookies, @Param('id') id : string, @Body() reqBody : UpdatePermissionDTO, @Res() response : Response){
      return this.permissionService.updatePermissionDataHandler(Cookies, id, reqBody, response);
    }

    @Delete('delete/:id')
    async deletePermissionDataHandler(@Cookies() Cookies, @Param('id') id : string, @Res() response : Response){
      return this.permissionService.deletePermissionDataHandler(Cookies, id, response);
    }
}
