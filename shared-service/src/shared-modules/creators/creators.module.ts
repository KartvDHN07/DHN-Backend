import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorEntity } from 'src/database/creators/creator.entity';

@Module({
  imports : [TypeOrmModule.forFeature([CreatorEntity])],
  controllers: [CreatorsController],
  providers: [CreatorsService]
})
export class CreatorsModule {}
