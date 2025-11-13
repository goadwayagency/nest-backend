import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import xss from 'xss';

export class LoginDto {
  @IsEmail({}, { message: 'Email must be valid' })
  @Transform(({ value }) => xss(value?.trim()))
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
