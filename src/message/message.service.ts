import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ClientProxy } from '@nestjs/microservices';
import { UserDetailDto } from '../user/dto/user-detail.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject('REDIS_CLIENT') private readonly clientProxy: ClientProxy,
  ) {}

  emitEvent(eventName: string, eventData: any): void {
    this.eventEmitter.emit(eventName, eventData);
  }

  @OnEvent('LOCAL-user-registered')
  localUserRegister(user: UserDetailDto) {
    this.clientProxy.emit('user-register', user);
  }

  @OnEvent('LOCAL-user-login')
  localUserLogin(user: UserDetailDto): void {
    this.clientProxy.emit('user-login', user);
  }

  @OnEvent('LOCAL-user-logout')
  localUserLogout(email: string): void {
    this.clientProxy.emit('user-logout', email);
  }
}
