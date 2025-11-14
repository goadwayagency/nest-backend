import { Inject, Injectable, Logger } from '@nestjs/common';
import { IEventBus } from '../interfaces/event.interface';
import { EventHandler } from '../handlers/event.handler';
import { EVENT_HANDLERS } from '../tokens';


@Injectable()
export class EventBusService implements IEventBus {
  private readonly logger = new Logger(EventBusService.name);
  constructor(@Inject(EVENT_HANDLERS) private readonly handlers: EventHandler[]) {}

  async emit(event: { type: string; payload: any }) {
    this.logger.debug(`Registered data====> ${JSON.stringify(event.payload, null, 2)}`);
    const matchingHandlers = this.handlers.filter(h => h.supports(event.type));

    if (!matchingHandlers.length) {
      console.warn(`No handler found for event type: ${event.type}`);
      return;
    }

    for (const handler of matchingHandlers) {
      await handler.handle(event.payload);
    }
  }
}
