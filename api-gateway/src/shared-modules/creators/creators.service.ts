import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { formattedResponseHandler } from 'src/handlers/formatResponseHandler';
import { addCreatorDataPtrn, getAllCreatorsPtrn, getCreatorByIdPtrn } from '../event-msg-pattern/creator.event.msg';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CreatorsService {
    constructor(@Inject('SharedService') private readonly sharedServiceClient: ClientProxy,
        private readonly generalConfigService: GeneralConfigService
    ){}

    async addCreatorDataHandler(cookies, response, reqBody) {
        try {
            let isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [createdSuccessfullyMsg, alreadyExistMsg, errorWhileCreatingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('createdSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('alreadyExistMsg'),
                this.generalConfigService.getConfigData('errorWhileCreatingMsg')
            ]);

            const pattern = { cmd : addCreatorDataPtrn}

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {...reqBody, createdSuccessfullyMsg, alreadyExistMsg, errorWhileCreatingMsg}
            ));

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async getAllCreatorsHandler(cookies, response){
        try {
            const isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('dataFetchedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileFetchingMsg')
            ]);

            const pattern = { cmd : getAllCreatorsPtrn};

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg}
            ));

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async getCreatorByIdHandler(cookies, id, response){
        try {
            const isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('dataFetchedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileFetchingMsg')
            ]);

            const pattern = { cmd : getCreatorByIdPtrn};

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {id, dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg}
            ));         

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

}
