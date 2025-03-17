import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { CreatorsService } from './creators.service';
import { Cookies } from 'src/handlers/customCookieDecorator';
import { response } from 'express';
import { CreateCreatorDto } from 'src/database/creators/creator.dtos';

const generalService = new GeneralConfigService();

const [apiPrefix, sharedServicePrefix] = ([
  generalService.getConfigData('apiPrefix'),
  generalService.getConfigData('sharedService'),
]);

@Controller(apiPrefix + '/' + sharedServicePrefix + '/creators')
export class CreatorsController {
    constructor(private readonly creatorService : CreatorsService){}

    @Post('add')
    async addCreatorDataHandler(@Cookies() Cookies, @Body() reqBody : CreateCreatorDto, @Res() response){
        return this.creatorService.addCreatorDataHandler(Cookies, response, reqBody);
    }

    @Get('getAll')
    async getAllCreatorsHandler(@Cookies() Cookies, @Res() response){
        return this.creatorService.getAllCreatorsHandler(Cookies, response);
    }

    @Get('get/:id')
    async getCreatorByIdHandler(@Cookies() Cookies, @Param('id') id : string, @Res() response){
      return this.creatorService.getCreatorByIdHandler(Cookies, id, response);
    }

}
