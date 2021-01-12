import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { pick } from 'lodash';
import { UserDetailDto } from '../../user/dto/user-detail.dto';
import { ParsedTokenDto } from '../dto/parsed-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: ParsedTokenDto): UserDetailDto {
    return pick(payload, [
      'name',
      'surname',
      'email',
      'language',
      'country',
      'isActive',
    ]);
  }
}
