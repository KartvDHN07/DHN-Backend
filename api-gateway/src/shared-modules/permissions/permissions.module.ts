import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroServiceRegister } from 'src/handlers/moduleBasedMSRegister';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';

@Module({
  imports : [ClientsModule.register([
    MicroServiceRegister('SharedService')
  ]), PermissionsModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, GeneralConfigService]
})
export class PermissionsModule {}
