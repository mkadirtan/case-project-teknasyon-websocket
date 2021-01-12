import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDetailDto } from '../user/dto/user-detail.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LoginDto): Promise<TokenDto> {
    const user: UserDetailDto = await this.userService.checkCredentials(
      credentials,
    );

    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(userDetails: RegisterDto): Promise<UserDetailDto> {
    return this.userService.createUser(userDetails);
  }
}
