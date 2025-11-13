import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { BuyerEvents } from '../buyer-events.enum';
import * as eventBusInterface from '../interfaces/event-bus.interface';

@Injectable()
export class EventPublisherService {
  constructor(
    @Inject('IEventBus') private readonly eventBus: eventBusInterface.IEventBus,
  ) {}

  async publishSignup(user: User, referralCode?: string) {
    await this.eventBus.emit({
      type: BuyerEvents.REFERRAL_SIGNUP,
      payload: { userId: user.id, email: user.email, referralCode },
    });
  }
}
