import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageController } from './message.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'REDIS_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            url: configService.get<string>('REDIS_CONNECTION_URL'),
          },
        }),
      },
    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
