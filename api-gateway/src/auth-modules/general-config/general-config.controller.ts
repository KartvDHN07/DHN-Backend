import { Controller, Get } from '@nestjs/common';
import { GeneralConfigService } from './general-config.service';

@Controller('general-config')
export class GeneralConfigController {

    constructor(private readonly generalConfigService : GeneralConfigService){}

    @Get()
    async getConfigData(){
        return this.generalConfigService.getConfigData();
    }
}
