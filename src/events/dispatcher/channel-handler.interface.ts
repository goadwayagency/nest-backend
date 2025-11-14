export interface ChannelHandler {
    readonly channelName: string;
    send(payload: any): Promise<void>;
    }