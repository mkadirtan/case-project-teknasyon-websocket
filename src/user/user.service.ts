import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { pick } from 'lodash';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createUser(userDetails: RegisterDto): Promise<UserDetailDto> {
    const newUser = await this.userRepository.createUser(userDetails);

    this.eventEmitter.emit('LOCAL-user-registered', newUser);

    return newUser;
  }

  async checkCredentials(loginDto: LoginDto): Promise<UserDetailDto> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) {
      throw new NotFoundException();
    }

    return pick(user, [
      'name',
      'surname',
      'email',
      'language',
      'country',
      'isActive',
    ]);
  }

  @OnEvent('LOCAL-user-login')
  localUserLogin(user: UserDetailDto) {
    return this.userRepository.update(
      { email: user.email },
      { isActive: true },
    );
  }

  @OnEvent('LOCAL-user-logout')
  localUserLogout(email: string) {
    return this.userRepository.update({ email }, { isActive: false });
  }

  async getActiveUsers() {
    return this.userRepository.find({ isActive: true });
  }
}