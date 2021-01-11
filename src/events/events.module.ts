import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1000s' },
      }),
    }),
  ],
  providers: [EventsGateway, EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
