import {
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({ namespace: 'socket' })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly jwtService: JwtService) {}

  @WebSocketServer()
  private readonly server: Server;

  /*emitEvent(eventName: string, eventData: any) {
    this.server.emit(eventName, eventData);
  }*/

  @SubscribeMessage('hi')
  hi(@MessageBody() data: string): WsResponse {
    return { event: 'hi', data: 'Hello world!' };
  }

  handleConnection(client: any, ...args): any {
    // NestJS doesn't support Guards for handleConnection at the moment.
    // It will in the future: https://github.com/nestjs/nest/issues/882
    const access_token = client.handshake.query?.access_token;
    if (!access_token) {
      return client.disconnect();
    }
    try {
      this.jwtService.verify(access_token, {
        ignoreExpiration: false,
      });
    } catch (err) {
      return client.disconnect();
    }
  }

  handleDisconnect(client: any): any {}
}
