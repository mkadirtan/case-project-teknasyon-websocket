import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './user.decorator';
import { UserDetailDto } from './dto/user-detail.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@User() user: UserDetailDto): UserDetailDto {
    return user;
  }
}
