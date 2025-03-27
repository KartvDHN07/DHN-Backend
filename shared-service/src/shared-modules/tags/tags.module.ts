import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoEntity } from 'src/database/seos/seo.entity';
import { TagsEntity } from 'src/database/tags/tags.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity, SeoEntity])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
