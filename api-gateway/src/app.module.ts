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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ClientsModule.register([
      {
        name: 'SharedService',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8081,
        },
      },
    ]),

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   database: process.env.DB_DATABASE,
    //   synchronize: true,
    //   entities : [path.join(__dirname, '**', '*.entity{.ts,.js}')]
    // })

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
