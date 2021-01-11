import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('ws-jwt') {
  // Override to get WS request instead of default http request information
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}
