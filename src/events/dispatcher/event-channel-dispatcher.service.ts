import { Inject, Injectable, Logger } from '@nestjs/common';
import { ChannelHandler } from './channel-handler.interface';
import { eventChannelRegistry } from './event-channel-registry';


@Injectable()
export class EventChannelDispatcher {
    private readonly logger = new Logger(EventChannelDispatcher.name);
    private readonly channelMap = new Map<string, ChannelHandler>();


    constructor(
        @Inject('CHANNEL_HANDLERS') private readonly handlers: ChannelHandler[],
    ) {
        for (const h of handlers) {
            this.channelMap.set(h.channelName, h);
        }
        this.logger.debug(`Registered channels: ${Array.from(this.channelMap.keys()).join(', ')}`);
    }

    async dispatch(eventType: string, payload: Record<string, any>) {
        const channels = eventChannelRegistry[eventType] ?? [];
        this.logger.debug(`Dispatching event '${eventType}' to channels: ${channels.join(', ')}`);
        this.logger.debug(`Dispatached Payload ${JSON.stringify(payload, null, 2)}`);

        for (const name of channels) {
            const handler = this.channelMap.get(name);
            if (!handler) {
                this.logger.warn(`No channel handler registered for: ${name}`);
                continue;
            }
            const slice = payload[name] ?? payload;

            this.logger.debug(`Sending payload to channel '${name}': ${JSON.stringify(slice)}`);

            await handler.send(slice, eventType); 
        }
    }
}