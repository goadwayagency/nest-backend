import { Injectable } from '@nestjs/common';
import { ReferralSignupHandler } from '../handlers/referral-signup/referral-signup.handler';
import { IEventBus } from '../interfaces/event.interface';

interface EventHandler {
  handle(payload: any): Promise<void>;
}

@Injectable()
export class EventBusService implements IEventBus {
  private readonly handlers: Record<string, EventHandler>;

  constructor(private readonly referralHandler: ReferralSignupHandler) {
    this.handlers = {
      'REFERRAL_SIGNUP': this.referralHandler,
      // add handler here
    };
  }

  async emit(event: { type: string; payload: any }) {
    const handler = this.handlers[event.type];
    if (handler) {
      await handler.handle(event.payload);
    } else {
      console.warn(`No handler found for event type: ${event.type}`);
    }
  }
}
