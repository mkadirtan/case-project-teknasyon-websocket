import {
  WebSocketServer,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  //SubscribeMessage,
  //WsResponse,
  //MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UserDetailDto } from '../user/dto/user-detail.dto';
import { ParsedTokenDto } from '../auth/dto/parsed-token.dto';
import { pick } from 'lodash';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway({ namespace: 'socket' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.clients = new WeakMap();
  }

  private readonly clients: WeakMap<Socket, UserDetailDto>;

  @WebSocketServer()
  private readonly server: Server;

  handleConnection(@ConnectedSocket() client: Socket): void {
    // emitEventNestJS doesn't support Guards for handleConnection at the moment.
    // It will in the future: https://github.com/nestjs/nest/issues/882
    const access_token = client.handshake.query?.access_token;
    if (!access_token) {
      client.disconnect();
      return;
    }
    try {
      this.jwtService.verify(access_token, {
        ignoreExpiration: false,
      });
      const payload: ParsedTokenDto = <ParsedTokenDto>(
        this.jwtService.decode(access_token)
      );
      const user: UserDetailDto = pick(payload, [
        'name',
        'surname',
        'email',
        'language',
        'country',
      ]);
      this.clients.set(client, user);
      this.eventEmitter.emit('LOCAL-user-login', user);
    } catch (err) {
      client.disconnect();
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    const { email } = <UserDetailDto>this.clients.get(client);
    this.clients.delete(client);
    this.eventEmitter.emit('LOCAL-user-logout', email);
  }

  @OnEvent('GLOBAL-user-login')
  globalUserLogin(user: UserDetailDto) {
    this.server.emit('user-login', user);
  }

  @OnEvent('GLOBAL-user-login')
  globalUserLogout(email: string) {
    this.server.emit('user-logout', email);
  }
}
