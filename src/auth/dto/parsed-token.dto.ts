import { UserDetailDto } from '../../user/dto/user-detail.dto';

export class ParsedTokenDto extends UserDetailDto {
  iat: number;
  exp: number;
}
