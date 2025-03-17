import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroServiceRegister } from 'src/handlers/moduleBasedMSRegister';

@Module({
  imports: [
    ClientsModule.register([MicroServiceRegister('SharedService')]),
    CreatorsModule,
  ],
  controllers: [CreatorsController],
  providers: [CreatorsService, GeneralConfigService]
})
export class CreatorsModule {}
