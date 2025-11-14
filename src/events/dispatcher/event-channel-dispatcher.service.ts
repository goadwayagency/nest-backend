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
    }


    async dispatch(eventType: string, payload: Record<string, any>) {
        const channels = eventChannelRegistry[eventType] ?? [];


        for (const name of channels) {
            const handler = this.channelMap.get(name);
            if (!handler) {
                this.logger.warn(`No channel handler registered for: ${name}`);
                continue;
            }


            const slice = payload[name] ?? payload;
            await handler.send(slice);
        }
    }
}