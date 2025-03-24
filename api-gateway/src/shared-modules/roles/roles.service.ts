import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { formattedResponseHandler } from 'src/handlers/formatResponseHandler';
import { firstValueFrom } from 'rxjs';
import { addRoleDataPtrn, deleteRoleDataPtrn, getAllRolesPtrn, getRoleByIdPtrn, updateRoleDataPtrn } from '../event-msg-pattern/role.event.msg';

@Injectable()
export class RolesService {
    constructor(@Inject('SharedService') private readonly sharedServiceClient: ClientProxy,
        private readonly generalConfigService: GeneralConfigService
    ){}

    async addRoleDataHandler(cookies, response, reqBody) {
        try {
            let isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [createdSuccessfullyMsg, alreadyExistMsg, errorWhileCreatingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('createdSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('alreadyExistMsg'),
                this.generalConfigService.getConfigData('errorWhileCreatingMsg')
            ]);

            const pattern = { cmd : addRoleDataPtrn}

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {...reqBody, createdSuccessfullyMsg, alreadyExistMsg, errorWhileCreatingMsg}
            ));

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async getAllRolesHandler(cookies, response){
        try {
            const isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('dataFetchedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileFetchingMsg')
            ]);

            const pattern = { cmd : getAllRolesPtrn};

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg}
            ));

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async getRoleByIdHandler(cookies, id, response){
        try {
            const isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('dataFetchedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileFetchingMsg')
            ]);

            const pattern = { cmd : getRoleByIdPtrn};

            const {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(
                pattern, 
                {id, dataFetchedSuccessfullyMsg, notFoundMsg, errorWhileFetchingMsg}
            ));         

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async updateRoleDataHandler(cookies, id, reqBody, response){
        try {
            let isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            if(!reqBody?.name && !reqBody?.slug && !reqBody?.isActive && !reqBody?.updatedAt && !reqBody?.permissions) return formattedResponseHandler(response, null, 400, 'No Data To Update !');
            
            let [updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('updatedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileUpdatingMsg')
            ]);

            const pattern = { cmd : updateRoleDataPtrn};

            let {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(pattern,
                {id, ...reqBody, updatedSuccessfullyMsg, notFoundMsg, errorWhileUpdatingMsg}
            ))

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }
    }

    async deleteRoleDataHandler(cookies, id, response){
        try {
            let isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if(!isAuthorized) return formattedResponseHandler(response, null, 401, this.generalConfigService.getConfigData('unauthorisedResponseMsg'));

            let [deletedSuccessfullyMsg, notFoundMsg, errorWhileDeletingMsg] = await Promise.all ([
                this.generalConfigService.getConfigData('deletedSuccessfullyMsg'), 
                this.generalConfigService.getConfigData('notFoundMsg'),
                this.generalConfigService.getConfigData('errorWhileDeletingMsg')
            ]);

            const pattern = { cmd : deleteRoleDataPtrn};

            let {status, data, message} = await firstValueFrom(this.sharedServiceClient.send(pattern,
                {id, deletedSuccessfullyMsg, notFoundMsg, errorWhileDeletingMsg}
            ))

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            return formattedResponseHandler(response, null, 400, error);
        }

    }
}
