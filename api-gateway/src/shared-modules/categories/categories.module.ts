import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroServiceRegister } from 'src/handlers/moduleBasedMSRegister';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';

@Module({
  imports: [
    ClientsModule.register([MicroServiceRegister('SharedService')]),
    CategoriesModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, GeneralConfigService],
})
export class CategoriesModule {}
