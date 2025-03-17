import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroServiceRegister } from 'src/handlers/moduleBasedMSRegister';

@Module({
  imports : [ClientsModule.register([
    MicroServiceRegister('SharedService'),
  ]), UsersModule],
  controllers: [UsersController],
  providers: [UsersService, GeneralConfigService]
})
export class UsersModule {}
