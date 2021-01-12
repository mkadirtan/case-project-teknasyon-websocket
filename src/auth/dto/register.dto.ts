import {
  IsEmail,
  MaxLength,
  MinLength,
  IsAlphanumeric,
  IsISO31661Alpha2,
  IsLocale,
} from 'class-validator';

export class RegisterDto {
  @MinLength(1)
  @MaxLength(30)
  readonly name: string;

  @MinLength(1)
  @MaxLength(30)
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(30)
  readonly password: string;

  @IsLocale()
  readonly language: string;

  @IsISO31661Alpha2()
  readonly country: string;
}
