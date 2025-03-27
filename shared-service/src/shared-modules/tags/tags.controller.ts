import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TagsService } from './tags.service';
import { addTagDataPtrn, deleteTagDataPtrn, getAllTagPtrn, getTagByIdPtrn, updateTagDataPtrn } from '../event-msg-pattern/tag.event.msg';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagService : TagsService){}

    @MessagePattern({cmd : addTagDataPtrn})
    async addTagDataHandler(@Body() reqBody){
        return this.tagService.addTagDataHandler(reqBody);
    }

    @MessagePattern({cmd : getAllTagPtrn})
    async getAllTagsHandler(@Body() reqBody){
        return this.tagService.getAllTagsHandler(reqBody);
    }

    @MessagePattern({cmd : getTagByIdPtrn})
    async getTagByIdHandler(@Body() reqBody){
        return this.tagService.getTagByIdHandler(reqBody);
    }

    @MessagePattern({cmd : updateTagDataPtrn})
    async updateTagDataHandler(@Body() reqBody){
        return this.tagService.updateTagDataHandler(reqBody);
    }

    @MessagePattern({cmd : deleteTagDataPtrn})
    async deleteTagDataHandler(@Body() reqBody){
        return this.tagService.deleteTagDataHandler(reqBody);
    }
}
