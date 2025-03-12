import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GeneralConfigService } from '../general-config/general-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/users/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, GeneralConfigService]
})
export class AuthModule {}
