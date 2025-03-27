import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { formattedResponseHandler } from 'src/handlers/formatResponseHandler';
import { firstValueFrom } from 'rxjs';
import { addTagDataPtrn, deleteTagDataPtrn, getAllTagPtrn, getTagByIdPtrn, updateTagDataPtrn } from '../event-msg-pattern/tag.event.msg';

@Injectable()
export class TagsService {
    constructor(@Inject('SharedService') private readonly sharedServiceClient: ClientProxy,
        private readonly generalConfigService: GeneralConfigService
    ){}

    async addTagDataHandler(cookies, response, reqBody) {
        try {
            let isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [createdSuccessfullyMsg, alreadyExistMsg, errorWhileCreatingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('createdSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('alreadyExistMsg'),
                this.generalConfigService.getConfigData('errorWhileCreatingMsg')
            ]);

            const pattern = { cmd : addTagDataPtrn}

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {...reqBody, createdSuccessfullyMsg, alreadyExistMsg, errorWhileCreatingMsg}
            ));

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async getAllTagsHandler(cookies, response){
        try {
            const isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('dataFetchedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileFetchingMsg')
            ]);

            const pattern = { cmd : getAllTagPtrn};

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg}
            ));

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async getTagByIdHandler(cookies, slug, response){
        try {
            const isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('dataFetchedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileFetchingMsg')
            ]);

            const pattern = { cmd : getTagByIdPtrn};

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {slug, dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg}
            ));         

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async updateTagDataHandler(cookies, slug, reqBody, response){
        try {
            let isAuthorized = await this.generalConfigService.validateAccessToken(cookies);
            
            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            if(!reqBody?.name && !reqBody?.updatedAt && !reqBody?.seo) return formattedResponseHandler(response, null, 400, 'No Data To Update !');
            
            let [updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('updatedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileUpdatingMsg')
            ]);

            const pattern = { cmd : updateTagDataPtrn};

            let {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(pattern,
                {...reqBody, updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg, slug : slug}
            ))

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async deleteTagDataHandler(cookies, slug, response){
        try {
            let isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [deletedSuccessfullyMsg, notFoundMsg, errorWhileDeletingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('deletedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileDeletingMsg')
            ]);

            const pattern = { cmd : deleteTagDataPtrn};

            let {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(pattern,
                {slug, deletedSuccessfullyMsg, notFoundMsg, errorWhileDeletingMsg}
            ))

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }

    }
}
