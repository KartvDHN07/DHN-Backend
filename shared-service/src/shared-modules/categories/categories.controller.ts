import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { addCategoryDataPtrn, deleteCategoryDataPtrn, getAllCategoriesPtrn, getCategoryByIdPtrn, updateCategoryDataPtrn } from '../event-msg-pattern/categories.event.msg';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService : CategoriesService){}

    @MessagePattern({cmd : addCategoryDataPtrn})
    async addCategoryDataHandler(@Body() reqBody){
        return this.categoryService.addCategoryDataHandler(reqBody);
    }

    @MessagePattern({cmd : getAllCategoriesPtrn})
    async getAllCategorysHandler(@Body() reqBody){
        return this.categoryService.getAllCategorysHandler(reqBody);
    }

    @MessagePattern({cmd : getCategoryByIdPtrn})
    async getCategoryByIdHandler(@Body() reqBody){
        return this.categoryService.getCategoryByIdHandler(reqBody);
    }

    @MessagePattern({cmd : updateCategoryDataPtrn})
    async updateCategoryDataHandler(@Body() reqBody){
        return this.categoryService.updateCategoryDataHandler(reqBody);
    }

    @MessagePattern({cmd : deleteCategoryDataPtrn})
    async deleteCategoryDataHandler(@Body() reqBody){
        return this.categoryService.deleteCategoryDataHandler(reqBody);
    }
}
