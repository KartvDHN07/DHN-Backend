import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { addUserDataPtrn } from '../event-msg-pattern/users.event.msg';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { formattedResponseHandler } from 'src/handlers/formatResponseHandler';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @Inject('SharedService') private readonly sharedServiceClient: ClientProxy,
        private readonly generalConfigService: GeneralConfigService
    ) {}

    async addUserDataHandler(cookies, response, reqBody) {
        try {
            const isAuthorized = await this.generalConfigService.validateAccessToken(cookies);

            if (!isAuthorized) {
                return formattedResponseHandler(response, null, 401, 'Unauthorized Access!');
            }

            const pattern = { cmd: addUserDataPtrn };

            console.log('first')

            const { status, data, message }: any = await firstValueFrom(
                this.sharedServiceClient.send(pattern, reqBody)
            );

            console.log('first')

            return formattedResponseHandler(response, data, status, message);
        } catch (error) {
            console.error('Error in addUserDataHandler:', error);
            return formattedResponseHandler(response, null, 500, 'Internal Server Error');
        }
    }
}
