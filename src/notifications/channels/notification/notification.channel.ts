import { Injectable } from '@nestjs/common';
import { ChannelHandler } from '../../../events/dispatcher/channel-handler.interface';
import { NotificationService } from './notification.service';


@Injectable()
export class NotificationChannel implements ChannelHandler {
    readonly channelName = 'notification';
    constructor(private readonly notificationService: NotificationService) { }


    async send(payload: { userId: string; message: string }) {
        await this.notificationService.createNotification(payload.userId, 'REFERRAL_SIGNUP', { message: payload.message });
    }
}