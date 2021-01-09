import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsISO31661Alpha2,
  IsLocale,
} from 'class-validator';

export class UserDetailDto {
  @MinLength(1)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @IsLocale()
  readonly language: string;

  @IsISO31661Alpha2()
  readonly country: string;
}
