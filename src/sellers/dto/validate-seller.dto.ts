import { IsString } from 'class-validator';

export class ValidateSellerDto {
  @IsString()
  adminId: string;
}
