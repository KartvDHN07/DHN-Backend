import { Body, Controller } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { MessagePattern } from '@nestjs/microservices';
import { addCreatorDataPtrn, deleteCreatorDataPtrn, getAllCreatorsPtrn, getCreatorByIdPtrn, updateCreatorDataPtrn } from '../event-msg-pattern/creator.event.msg';

@Controller('creators')
export class CreatorsController {
    constructor(private readonly creatorService : CreatorsService){}

    @MessagePattern({cmd : addCreatorDataPtrn})
    async addCreatorDataHandler(@Body() reqBody){
        return this.creatorService.addCreatorDataHandler(reqBody);
    }

    @MessagePattern({cmd : getAllCreatorsPtrn})
    async getAllCreatorsHandler(@Body() reqBody){
        return this.creatorService.getAllCreatorsHandler(reqBody);
    }

    @MessagePattern({cmd : getCreatorByIdPtrn})
    async getCreatorByIdHandler(@Body() reqBody){
        return this.creatorService.getCreatorByIdHandler(reqBody);
    }

    @MessagePattern({cmd : updateCreatorDataPtrn})
    async updateCreatorDataHandler(@Body() reqBody){
        return this.creatorService.updateCreatorDataHandler(reqBody);
    }

    @MessagePattern({cmd : deleteCreatorDataPtrn})
    async deleteCreatorDataHandler(@Body() reqBody){
        return this.creatorService.deleteCreatorDataHandler(reqBody);
    }
}
