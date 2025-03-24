import { Body, Controller, Get, Param, Patch, Post, Res, Delete } from '@nestjs/common';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { Cookies } from 'src/handlers/customCookieDecorator';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/database/categories/category.dtos';

const generalService = new GeneralConfigService();

const [apiPrefix, sharedServicePrefix] = ([
  generalService.getConfigData('apiPrefix'),
  generalService.getConfigData('sharedService'),
]);

@Controller(apiPrefix + '/' + sharedServicePrefix + '/categories')
export class CategoriesController {
    constructor(private readonly categoryService : CategoriesService){}

    @Post('add')
    async addCategoryDataHandler(@Cookies() Cookies, @Body() reqBody : CreateCategoryDTO, @Res() response : Response){
        return this.categoryService.addCategoryDataHandler(Cookies, response, reqBody);
    }

    @Get('getAll')
    async getAllCategorysHandler(@Cookies() Cookies, @Res() response : Response){
        return this.categoryService.getAllCategorysHandler(Cookies, response);
    }

    @Get('get/:slug')
    async getCategoryByIdHandler(@Cookies() Cookies, @Param('slug') slug : string, @Res() response : Response){
      return this.categoryService.getCategoryByIdHandler(Cookies, slug, response);
    }

    @Patch('update/:slug')
    async updateCategoryDataHandler(@Cookies() Cookies, @Param('slug') slug : string, @Body() reqBody : UpdateCategoryDTO, @Res() response : Response){
      return this.categoryService.updateCategoryDataHandler(Cookies, slug, reqBody, response);
    }

    @Delete('delete/:slug')
    async deleteCategoryDataHandler(@Cookies() Cookies, @Param('slug') slug : string, @Res() response : Response){
      return this.categoryService.deleteCategoryDataHandler(Cookies, slug, response);
    }
}
