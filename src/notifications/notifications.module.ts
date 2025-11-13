import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { ReferralSignupUIHandler } from './handlers/referral-signup-ui.handler';
import { NotificationsRepository } from './notifications.repository';

@Module({
  providers: [
    NotificationService,
    ReferralSignupUIHandler,
    {
      provide: 'INotificationsRepository',
      useClass: NotificationsRepository,
    },
  ],
  exports: [ReferralSignupUIHandler,NotificationService],
})
export class NotificationsModule {}
