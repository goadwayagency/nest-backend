import { Injectable } from '@nestjs/common';
import { INotificationHandler } from '../interfaces/notification-handler.interface';
import { NotificationService } from '../notification.service';

@Injectable()
export class ReferralSignupUIHandler implements INotificationHandler<{ userId: string; referralCode: string }> {
  constructor(private readonly notificationService: NotificationService) {}

  async handle({ userId, referralCode }: { userId: string; referralCode: string }) {
    await this.notificationService.createNotification(userId, 'REFERRAL_SIGNUP', {
      message: `Your referral code ${referralCode} was used!`,
    });
  }
}
