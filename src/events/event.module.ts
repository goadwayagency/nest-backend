import { Module, Global, Inject, OnModuleInit } from '@nestjs/common'; 
import { InMemoryEventBus } from './event-bus'; 
import { ReferralSignupUIHandler } from 'src/notifications/handlers/referral-signup-ui.handler';
import { BuyerEvents } from 'src/auth/services/auth.service';
import * as eventBusInterface from './interfaces/event-bus.interface';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { EventPublisherService } from './services/event-publisher.service';

@Global()
@Module({
  imports: [NotificationsModule],
  providers: [
    { provide: 'IEventBus', useClass: InMemoryEventBus },
    EventPublisherService,
    ReferralSignupUIHandler,
  ],
  exports: ['IEventBus', EventPublisherService],
})
export class EventModule implements OnModuleInit {
  constructor(
    @Inject('IEventBus')
    private readonly eventBus: eventBusInterface.IEventBus,
    private readonly referralSignupHandler: ReferralSignupUIHandler,
  ) {}

  onModuleInit() {
    this.eventBus.subscribe(
      BuyerEvents.REFERRAL_SIGNUP,
      this.referralSignupHandler.handle.bind(this.referralSignupHandler),
    );
  }
}

