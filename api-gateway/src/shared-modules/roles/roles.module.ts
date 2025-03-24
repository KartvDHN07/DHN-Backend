import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroServiceRegister } from 'src/handlers/moduleBasedMSRegister';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';

@Module({
  imports : [ClientsModule.register([
    MicroServiceRegister('SharedService'),
  ]), RolesModule],
  controllers: [RolesController],
  providers: [RolesService, GeneralConfigService]
})
export class RolesModule {}
