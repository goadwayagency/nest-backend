import { Injectable } from '@nestjs/common';
import { EventChannelDispatcher } from '../../dispatcher/event-channel-dispatcher.service';
import { ReferralSignupEventPayload } from './referral-signup.event';


@Injectable()
export class ReferralSignupHandler {
    constructor(private readonly dispatcher: EventChannelDispatcher) { }


    async handle(payload: ReferralSignupEventPayload) {
        await this.dispatcher.dispatch('REFERRAL_SIGNUP', {
            notification: {
                userId: payload.userId,
                message: `Your referral code ${payload.referralCode} was used!`,
            },
            email: {
                email: payload.email,
                subject: 'Your referral code was used',
                body: `Congrats — your referral code ${payload.referralCode} was used!`,
            },
            // sms, push slices can be added when needed
        });
    }
}