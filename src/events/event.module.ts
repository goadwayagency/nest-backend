import { Module } from '@nestjs/common';
import { EventChannelDispatcher } from './dispatcher/event-channel-dispatcher.service';
import { ReferralSignupHandler } from './handlers/referral-signup/referral-signup.handler';
import { NotificationsModule } from '../notifications/notifications.module';
import { EventBusService } from './services/event-bus.service';
import { EventPublisherService } from './publisher/event-publisher.service';


@Module({
  imports: [NotificationsModule],
  providers: [
    ReferralSignupHandler,
    EventChannelDispatcher,
    EventPublisherService,
    { provide: 'IEventBus', useClass: EventBusService },
    EventBusService,
  ],
  exports: ['IEventBus', EventChannelDispatcher],
})
export class EventsModule { }