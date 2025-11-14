import { Injectable } from '@nestjs/common';
import { EventHandler } from '../event.handler';
import { EventChannelDispatcher } from 'src/events/dispatcher/event-channel-dispatcher.service';


@Injectable()
export class ReferralSignupHandler implements EventHandler {
  constructor(private readonly dispatcher: EventChannelDispatcher) {}

  supports(eventType: string): boolean {
    return eventType === 'REFERRAL_SIGNUP';
  }

  async handle(payload: { userId: string; email: string; referralCode?: string }) {
    await this.dispatcher.dispatch('REFERRAL_SIGNUP', {
      notification: {
        userId: payload.userId,
        message: `Welcome! Referral code used: ${payload.referralCode}`,
      },
      email: {
        email: payload.email,
        subject: 'Welcome!',
        body: `Hello! Your referral code is ${payload.referralCode}`,
      },
    });
  }
}
