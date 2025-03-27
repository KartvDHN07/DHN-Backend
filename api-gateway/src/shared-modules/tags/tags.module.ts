import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroServiceRegister } from 'src/handlers/moduleBasedMSRegister';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';

@Module({
  imports : [ClientsModule.register([
    MicroServiceRegister('SharedService')
  ]), TagsModule],
  controllers: [TagsController],
  providers: [TagsService, GeneralConfigService]
})
export class TagsModule {}
