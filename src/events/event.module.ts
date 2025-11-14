import { Module } from '@nestjs/common';
import { EventChannelDispatcher } from './dispatcher/event-channel-dispatcher.service';
import { ReferralSignupHandler } from './handlers/buyer-events/referral-signup.handler';
import { NotificationsModule } from '../notifications/notifications.module';
import { EventBusService } from './services/event-bus.service';
import { EventPublisherService } from './publisher/event-publisher.service';
import { AccountValidationHandler } from './handlers/seller-events/account-validation.handler';
import { EVENT_HANDLERS } from './tokens';

@Module({
  imports: [NotificationsModule],
  providers: [
    ReferralSignupHandler,
    EventChannelDispatcher,
    EventPublisherService,
    EventBusService,
    ReferralSignupHandler,
    AccountValidationHandler,
    { provide: 'IEventBus', useClass: EventBusService },
    {
      provide: EVENT_HANDLERS,
      useFactory: (
        referral: ReferralSignupHandler,
        account: AccountValidationHandler,
      ) => [referral, account],
      inject: [ReferralSignupHandler, AccountValidationHandler],
    },
  ],
  exports: ['IEventBus', EventChannelDispatcher],
})
export class EventsModule { }