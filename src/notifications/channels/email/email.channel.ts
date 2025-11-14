import { Injectable } from '@nestjs/common';
import { ChannelHandler } from '../../../events/dispatcher/channel-handler.interface';
import { EmailService } from './email.service';


@Injectable()
export class EmailChannel implements ChannelHandler {
    readonly channelName = 'email';
    constructor(private readonly emailService: EmailService) { }


    async send(payload: { email: string; subject: string; body: string }) {
        if (!payload?.email) return;
        await this.emailService.sendEmail({ to: payload.email, subject: payload.subject, body: payload.body });
    }
}