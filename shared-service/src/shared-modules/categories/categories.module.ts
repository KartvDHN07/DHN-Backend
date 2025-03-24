import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/categories/category.entity';
import { SeoEntity } from 'src/database/seos/seo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, SeoEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
