import { IsAlphanumeric, IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(30)
  readonly password: string;
}