import { Body, Controller } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { MessagePattern } from '@nestjs/microservices';
import { addCreatorDataPtrn, getAllCreatorsPtrn, getCreatorByIdPtrn } from '../event-msg-pattern/creator.event.msg';

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
}
