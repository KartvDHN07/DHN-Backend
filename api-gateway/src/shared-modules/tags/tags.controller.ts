import { Body, Controller, Get, Param, Patch, Post, Res, Delete } from '@nestjs/common';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { Cookies } from 'src/handlers/customCookieDecorator';
import { Response } from 'express';
import { TagsService } from './tags.service';
import { CreateTagsDTO, UpdateTagsDTO } from 'src/database/tags/tag.dtos';

const generalService = new GeneralConfigService();

const [apiPrefix, sharedServicePrefix] = ([
  generalService.getConfigData('apiPrefix'),
  generalService.getConfigData('sharedService'),
]);

@Controller(apiPrefix + '/' + sharedServicePrefix + '/tags')
export class TagsController {
    constructor(private readonly tagService : TagsService){}

    @Post('add')
    async addTagDataHandler(@Cookies() Cookies, @Body() reqBody : CreateTagsDTO, @Res() response : Response){
        return this.tagService.addTagDataHandler(Cookies, response, reqBody);
    }

    @Get('getAll')
    async getAllTagsHandler(@Cookies() Cookies, @Res() response : Response){
        return this.tagService.getAllTagsHandler(Cookies, response);
    }

    @Get('get/:slug')
    async getTagByIdHandler(@Cookies() Cookies, @Param('slug') slug : string, @Res() response : Response){
      return this.tagService.getTagByIdHandler(Cookies, slug, response);
    }

    @Patch('update/:slug')
    async updateTagDataHandler(@Cookies() Cookies, @Param('slug') slug : string, @Body() reqBody : UpdateTagsDTO, @Res() response : Response){
      return this.tagService.updateTagDataHandler(Cookies, slug, reqBody, response);
    }

    @Delete('delete/:slug')
    async deleteTagDataHandler(@Cookies() Cookies, @Param('slug') slug : string, @Res() response : Response){
      return this.tagService.deleteTagDataHandler(Cookies, slug, response);
    }
}
