import { Module } from '@nestjs/common';
import { NotificationChannel } from './channels/notification/notification.channel';
import { EmailService } from './channels/email/email.service';
import { EmailChannel } from './channels/email/email.channel';
import { NotificationsRepository } from './notifications.repository';
import { ChannelsModule } from './channels/channels.module';

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
  ],
  exports: ['CHANNEL_HANDLERS', EmailService],
})
export class NotificationsModule {}
