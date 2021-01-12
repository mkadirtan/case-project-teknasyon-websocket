import { Controller } from '@nestjs/common';
import { UserDetailDto } from '../user/dto/user-detail.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern('user-login')
  globalUserLogin(@Payload() user: UserDetailDto): void {
    this.messageService.emitEvent('GLOBAL-user-login', user);
  }

  @EventPattern('user-logout')
  globalUserLogout(@Payload() email: string): void {
    this.messageService.emitEvent('GLOBAL-user-logout', email);
  }

  @EventPattern('user-register')
  globalUserRegister(@Payload() user: UserDetailDto) {
    this.messageService.emitEvent('GLOBAL-user-register', user);
  }
}
