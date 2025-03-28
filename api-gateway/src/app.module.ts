import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth-modules/auth/auth.module';
import { UsersModule } from './shared-modules/users/users.module';
import { GeneralConfigModule } from './auth-modules/general-config/general-config.module';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';
import { CreatorsModule } from './shared-modules/creators/creators.module';
import { PermissionsModule } from './shared-modules/permissions/permissions.module';
import { RolesModule } from './shared-modules/roles/roles.module';
import { CategoriesModule } from './shared-modules/categories/categories.module';
import { TagsModule } from './shared-modules/tags/tags.module';

@Module({
  imports: [
    // Made Env File Globally Available
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // JWT Module Configuration
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      global : true
    }),

    // Shared Microservice Configuration
    ClientsModule.register([
      {
        name: 'SharedService',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          retryAttempts: 10,        // Number of retry attempts
          retryDelay: 3000,         // Delay between retries in milliseconds
          connectTimeout: 10000,    // Timeout for connection in milliseconds
          maxRetriesPerRequest: 5,
        },
      },
    ]),

    // Database connection
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
        synchronize: true,
        entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],
      }),
    }),

    AuthModule,
    UsersModule,
    GeneralConfigModule,
    CreatorsModule,
    PermissionsModule,
    RolesModule,
    CategoriesModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
