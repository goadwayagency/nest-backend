import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { BuyerEvents } from '../enums/buyer-events.enum';
import { SellerEvents } from '../enums/seller-events.enum';
import * as eventInterface from '../interfaces/event.interface';

@Injectable()
export class EventPublisherService {
  constructor(@Inject('IEventBus') private readonly eventBus: eventInterface.IEventBus) {}

  // Existing method
  async publishSignup(user: User, referralCode?: string) {
    await this.eventBus.emit({
      type: BuyerEvents.REFERRAL_SIGNUP,
      payload: { userId: user.id, email: user.email, referralCode },
    });
  }

  // SELLER EVENTS
  async publishSellerValidation(seller: User, adminId: string) {
    await this.eventBus.emit({
      type: SellerEvents.ACCOUNT_VALIDATION,
      payload: {userId: seller.id, email: seller.email, adminId },
    });
  }

  // generic
  async publish(type: string, payload: any) {
    await this.eventBus.emit({ type, payload });
  }
}
