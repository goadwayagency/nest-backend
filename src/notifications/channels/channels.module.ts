import { Module } from '@nestjs/common';
import { NotificationService } from './notification/notification.service';
import { NotificationChannel } from './notification/notification.channel';
import { EmailService } from './email/email.service';
import { EmailChannel } from './email/email.channel';
import { NotificationsRepository } from '../notifications.repository';
import { BrevoEmailProvider } from '../providers/brevo-email.provider';

@Module({
  providers: [
    NotificationService,
    NotificationChannel,
    EmailService,
    EmailChannel,
    {
      provide: 'CHANNEL_HANDLERS',
      useFactory: (...handlers: any[]) => handlers,
      inject: [NotificationChannel, EmailChannel],
    },
    {
      provide: 'INotificationsRepository',
      useClass: NotificationsRepository,
    },
    BrevoEmailProvider,
    { provide: 'IEmailProvider', useClass: BrevoEmailProvider },
  ],
  exports: ['CHANNEL_HANDLERS', NotificationService, EmailService, 'IEmailProvider', BrevoEmailProvider],
})
export class ChannelsModule { }
