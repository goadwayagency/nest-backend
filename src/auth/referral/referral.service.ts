import { Injectable } from '@nestjs/common';
import { IReferralValidator } from '../interfaces/referral-validator.interface';

@Injectable()
export class ReferralService implements IReferralValidator {
  private validCodes = ['ABC123', 'XYZ789'];

  async validate(code: string): Promise<boolean> {
    return this.validCodes.includes(code);
  }
}
