import { Injectable } from '@nestjs/common';
import { EventHandler } from '../event.handler';
import { EventChannelDispatcher } from '../../../../src/events/dispatcher/event-channel-dispatcher.service'
@Injectable()
export class AccountValidationHandler implements EventHandler {
  constructor(private readonly dispatcher: EventChannelDispatcher) {}

  supports(eventType: string): boolean {
    return eventType === 'ACCOUNT_VALIDATION';
  }

  async handle(payload: { userId: string; email: string;}) {
    await this.dispatcher.dispatch('ACCOUNT_VALIDATION', {
      notification: {
        userId: payload.userId,
        message: `Your seller account has been validated by admin.`,
      },
      email: {
        email: payload.email,
        subject: 'Account Validation',
        body: `Hello! Your seller account has been validated.`,
      },
    });
  }
}
