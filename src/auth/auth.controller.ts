import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDetailDto } from '../user/dto/user-detail.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe({ skipMissingProperties: false }))
    credentials: LoginDto,
  ): Promise<TokenDto> {
    return this.authService.login(credentials);
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ skipMissingProperties: false }))
    userDetails: RegisterDto,
  ): Promise<UserDetailDto> {
    return this.authService.register(userDetails);
  }
}
