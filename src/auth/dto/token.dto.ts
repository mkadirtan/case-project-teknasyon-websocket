import { IsJWT } from 'class-validator';

export class TokenDto {
  @IsJWT()
  access_token: string;
}