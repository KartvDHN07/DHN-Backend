import { Body, Controller, Get, Param, Patch, Post, Res, Delete } from '@nestjs/common';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { CreatorsService } from './creators.service';
import { Cookies } from 'src/handlers/customCookieDecorator';
import { CreateCreatorDto, UpdateCreatorDto } from 'src/database/creators/creator.dtos';
import { Response } from 'express';

const generalService = new GeneralConfigService();

const [apiPrefix, sharedServicePrefix] = ([
  generalService.getConfigData('apiPrefix'),
  generalService.getConfigData('sharedService'),
]);

@Controller(apiPrefix + '/' + sharedServicePrefix + '/creators')
export class CreatorsController {
    constructor(private readonly creatorService : CreatorsService){}

    @Post('add')
    async addCreatorDataHandler(@Cookies() Cookies, @Body() reqBody : CreateCreatorDto, @Res() response : Response){
        return this.creatorService.addCreatorDataHandler(Cookies, response, reqBody);
    }

    @Get('getAll')
    async getAllCreatorsHandler(@Cookies() Cookies, @Res() response : Response){
        return this.creatorService.getAllCreatorsHandler(Cookies, response);
    }

    @Get('get/:id')
    async getCreatorByIdHandler(@Cookies() Cookies, @Param('id') id : string, @Res() response : Response){
      return this.creatorService.getCreatorByIdHandler(Cookies, id, response);
    }

    @Patch('update/:id')
    async updateCreatorDataHandler(@Cookies() Cookies, @Param('id') id : string, @Body() reqBody : UpdateCreatorDto, @Res() response : Response){
      return this.creatorService.updateCreatorDataHandler(Cookies, id, reqBody, response);
    }

    @Delete('delete/:id')
    async deleteCreatorDataHandler(@Cookies() Cookies, @Param('id') id : string, @Res() response : Response){
      return this.creatorService.deleteCreatorDataHandler(Cookies, id, response);
    }
}
