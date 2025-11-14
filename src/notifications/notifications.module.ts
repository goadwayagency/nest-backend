import { Module } from '@nestjs/common';
import { NotificationChannel } from './channels/notification/notification.channel';
import { EmailService } from './channels/email/email.service';
import { EmailChannel } from './channels/email/email.channel';
import { NotificationsRepository } from './notifications.repository';
import { ChannelsModule } from './channels/channels.module';
import { NotificationService } from './channels/notification/notification.service';
import { BrevoEmailProvider } from './providers/brevo-email.provider';

@Module({
  imports: [ChannelsModule],
  providers: [
    NotificationChannel,
    EmailService,
    EmailChannel,
    NotificationsRepository,
    {
      provide: 'INotificationsRepository',
      useClass: NotificationsRepository,
    },
    {
      provide: 'CHANNEL_HANDLERS',
      useFactory: (...handlers: any[]) => handlers,
      inject: [NotificationChannel, EmailChannel],
    },
    NotificationService, 
  ],
  exports: [
    'CHANNEL_HANDLERS',
    EmailService,
    NotificationService,
    'INotificationsRepository',
  ],
})
export class NotificationsModule {}
