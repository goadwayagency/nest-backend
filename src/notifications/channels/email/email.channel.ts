// email.channel.ts
import { Inject, Injectable } from '@nestjs/common';
import { ChannelHandler } from '../../../events/dispatcher/channel-handler.interface';
import * as emailProviderInterface from 'src/notifications/interfaces/email-provider.interface';

@Injectable()
export class EmailChannel implements ChannelHandler {
  readonly channelName = 'email';

  constructor(@Inject('IEmailProvider') private readonly emailProvider: emailProviderInterface.IEmailProvider) {}

  async send(payload: { email: string; subject?: string; body?: string; referralCode?: string }, eventType?: string) {
    if (!payload?.email) return;

    let templateId: number | undefined;
    let params: Record<string, any> | undefined;

    switch (eventType) {
      case 'REFERRAL_SIGNUP':
        templateId = 1;
        params = { referralCode: payload.referralCode, userEmail: payload.email };
        break;
      case 'ACCOUNT_VALIDATION':
        templateId = 2;
        params = { userEmail: payload.email };
        break;
    }

    await this.emailProvider.sendEmail({
      to: payload.email,
      subject: payload.subject,
      body: payload.body,
      templateId,
      params,
    });
  }
}
