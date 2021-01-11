import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ParsedTokenDto } from '../dto/parsed-token.dto';
import { UserDetailDto } from '../../user/dto/user-detail.dto';
import { pick } from 'lodash';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: ParsedTokenDto): UserDetailDto {
    return pick(payload, ['name', 'surname', 'email', 'language', 'country']);
  }
}
