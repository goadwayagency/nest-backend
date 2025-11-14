import { Injectable, BadRequestException } from '@nestjs/common';
import { IPolicy } from './ipolicy.interface';
import { ReferralService } from '../services/referral.service';

@Injectable()
export class ReferralPolicy implements IPolicy<string | undefined> {
  constructor(private readonly referralService: ReferralService) {}

  async validate(code?: string): Promise<void> {
    if (!code) return;
    const exists = await this.referralService.validate(code);
    if (!exists) throw new BadRequestException('Invalid referral code');
  }
}
