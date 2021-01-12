import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { omit, assign } from 'lodash';
import { UserDetailDto } from './dto/user-detail.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(RegisterDto: RegisterDto): Promise<UserDetailDto> {
    const { password } = RegisterDto;
    const salt = await bcrypt.genSalt();
    const passwordHash = await UserRepository.hashPassword(password, salt);

    const user = new User();
    assign(user, { ...RegisterDto, password: passwordHash, salt });

    try {
      await user.save();
      return omit(user, ['password', 'salt', 'id']);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
