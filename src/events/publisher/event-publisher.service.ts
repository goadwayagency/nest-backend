import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { BuyerEvents } from '../enums/buyer-events.enum';
import * as eventInterface from '../interfaces/event.interface';


@Injectable()
export class EventPublisherService {
    constructor(@Inject('IEventBus') private readonly eventBus: eventInterface.IEventBus) { }


    async publishSignup(user: User, referralCode?: string) {
        await this.eventBus.emit({
            type: BuyerEvents.REFERRAL_SIGNUP,
            payload: { userId: user.id, email: user.email, referralCode },
        });
    }
}