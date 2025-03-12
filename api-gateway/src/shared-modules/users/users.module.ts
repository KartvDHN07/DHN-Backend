import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GeneralConfigService } from 'src/auth-modules/general-config/general-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/users/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, GeneralConfigService]
})
export class UsersModule {}
