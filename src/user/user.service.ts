import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(userDetails: RegisterDto): Promise<UserDetailDto> {
    return this.userRepository.createUser(userDetails);
  }

  async checkCredentials(loginDto: LoginDto): Promise<UserDetailDto> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) {
      throw new NotFoundException();
    }

    return omit(user, ['salt', 'password', 'id']);
  }
}