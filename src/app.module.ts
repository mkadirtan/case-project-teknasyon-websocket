import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: parseInt(configService.get('PG_PORT')),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASS'),
        database: configService.get('PG_DATABASE'),
        entities: [join(__dirname, '**', '*.entity.{js,ts}')],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
