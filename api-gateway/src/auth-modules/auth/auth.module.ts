import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GeneralConfigService } from '../general-config/general-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/users/user.entity';
import { CreatorEntity } from 'src/database/creators/creator.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity, CreatorEntity])],
  controllers: [AuthController],
  providers: [AuthService, GeneralConfigService]
})
export class AuthModule {}
