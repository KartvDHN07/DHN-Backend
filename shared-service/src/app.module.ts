import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './shared-modules/users/users.module';
import { CreatorsModule } from './shared-modules/creators/creators.module';
import { PermissionsModule } from './shared-modules/permissions/permissions.module';
import { RolesModule } from './shared-modules/roles/roles.module';
import { CategoriesModule } from './shared-modules/categories/categories.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : '.env',
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
        entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],
      }),
    }),

    UsersModule,

    CreatorsModule,

    PermissionsModule,

    RolesModule,

    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
