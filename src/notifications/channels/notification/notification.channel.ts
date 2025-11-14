import { Injectable } from '@nestjs/common';
import { ChannelHandler } from '../../../events/dispatcher/channel-handler.interface';
import { NotificationService } from './notification.service';


@Injectable()
export class NotificationChannel implements ChannelHandler<{ userId: string; message: string }> {
    readonly channelName = 'notification';

    constructor(private readonly notificationService: NotificationService) {}

    async send(payload: { userId: string; message: string }, eventType?: string) {
        if (!eventType) eventType = 'UNKNOWN_EVENT';
        await this.notificationService.createNotification(payload.userId, eventType, {
            message: payload.message,
        });
    }
}

