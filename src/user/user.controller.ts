import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailDto } from './dto/user-detail.dto';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@User() user: UserDetailDto): UserDetailDto {
    return user;
  }
}
