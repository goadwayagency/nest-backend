import { IsEmail, IsNotEmpty, Length, Matches, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import xss from 'xss';

export class SignupDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @Transform(({ value }) => xss(value?.trim()))
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: 'Password must contain uppercase, lowercase, and number',
  })
  password: string;

  @IsOptional()
  @Transform(({ value }) => value ? xss(value.trim()) : null)
  @IsNotEmpty({ message: 'Referral code is required' })
  referralCode: string;
}
